import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

// ---------------------------------------------------------------------------
// CWAI journal reminder sender.
// Invoked on a schedule (database cron). For every subscription whose local
// reminder time matches the current 15-minute bucket, it delivers a Web Push
// notification using VAPID (RFC 8292) with aes128gcm payload encryption
// (RFC 8291 + RFC 8188). All crypto uses the WebCrypto API only.
// ---------------------------------------------------------------------------

const logStep = (step: string, details?: unknown) => {
  console.log(`[JOURNAL-REMINDERS] ${step}${details ? ` - ${JSON.stringify(details)}` : ""}`);
};

// --- base64url helpers -----------------------------------------------------

function b64urlEncode(data: Uint8Array | string): string {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function concatBytes(...parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, p) => sum + p.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const p of parts) {
    out.set(p, offset);
    offset += p.length;
  }
  return out;
}

// --- VAPID JWT (RFC 8292) --------------------------------------------------

async function createVapidJwt(
  audience: string,
  subject: string,
  privateJwk: JsonWebKey,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "jwk",
    { ...privateJwk, key_ops: ["sign"], ext: false },
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"],
  );
  const header = b64urlEncode(JSON.stringify({ typ: "JWT", alg: "ES256" }));
  const body = b64urlEncode(
    JSON.stringify({
      aud: audience,
      exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
      sub: subject,
    }),
  );
  const unsigned = `${header}.${body}`;
  const signature = new Uint8Array(
    await crypto.subtle.sign(
      { name: "ECDSA", hash: "SHA-256" },
      key,
      new TextEncoder().encode(unsigned),
    ),
  );
  return `${unsigned}.${b64urlEncode(signature)}`;
}

// --- Payload encryption: RFC 8291 (ECDH + HKDF) + RFC 8188 (aes128gcm) -----

async function hmacSha256(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const hmacKey = await crypto.subtle.importKey(
    "raw",
    key as BufferSource,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", hmacKey, data as BufferSource));
}

async function encryptPayload(
  p256dh: string,
  auth: string,
  payloadText: string,
): Promise<Uint8Array> {
  const uaPublic = b64urlDecode(p256dh); // 65-byte uncompressed P-256 point
  const authSecret = b64urlDecode(auth);

  const uaKey = await crypto.subtle.importKey(
    "raw",
    uaPublic as BufferSource,
    { name: "ECDH", namedCurve: "P-256" },
    false,
    [],
  );
  const asKeys = await crypto.subtle.generateKey(
    { name: "ECDH", namedCurve: "P-256" },
    true,
    ["deriveBits"],
  );
  const sharedSecret = new Uint8Array(
    await crypto.subtle.deriveBits({ name: "ECDH", public: uaKey }, asKeys.privateKey, 256),
  );
  const asPublic = new Uint8Array(await crypto.subtle.exportKey("raw", asKeys.publicKey));

  // RFC 8291 section 3.3: derive the input keying material
  const enc = new TextEncoder();
  const keyInfo = concatBytes(enc.encode("WebPush: info"), new Uint8Array([0]), uaPublic, asPublic);
  const prk1 = await hmacSha256(authSecret, sharedSecret);
  const ikm = await hmacSha256(prk1, concatBytes(keyInfo, new Uint8Array([1])));

  // RFC 8188 section 2.3: derive content encryption key and nonce
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const prk2 = await hmacSha256(salt, ikm);
  const cekInfo = concatBytes(enc.encode("Content-Encoding: aes128gcm"), new Uint8Array([0, 1]));
  const nonceInfo = concatBytes(enc.encode("Content-Encoding: nonce"), new Uint8Array([0, 1]));
  const cek = (await hmacSha256(prk2, cekInfo)).slice(0, 16);
  const nonce = (await hmacSha256(prk2, nonceInfo)).slice(0, 12);

  // Single record: payload followed by the padding delimiter 0x02
  const plaintext = concatBytes(enc.encode(payloadText), new Uint8Array([2]));
  const aesKey = await crypto.subtle.importKey("raw", cek as BufferSource, "AES-GCM", false, ["encrypt"]);
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce as BufferSource }, aesKey, plaintext as BufferSource),
  );

  // aes128gcm content-coding header: salt(16) | record size(4) | key id len(1) | key id
  const recordSize = new Uint8Array([0, 0, 16, 0]); // 4096
  return concatBytes(salt, recordSize, new Uint8Array([asPublic.length]), asPublic, ciphertext);
}

// --- Send one notification -------------------------------------------------

type SubscriptionRow = {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
};

async function sendPush(
  sub: SubscriptionRow,
  payload: Record<string, unknown>,
  vapid: { publicKey: string; privateJwk: JsonWebKey; subject: string },
): Promise<number> {
  const audience = new URL(sub.endpoint).origin;
  const jwt = await createVapidJwt(audience, vapid.subject, vapid.privateJwk);
  const body = await encryptPayload(sub.p256dh, sub.auth, JSON.stringify(payload));

  const response = await fetch(sub.endpoint, {
    method: "POST",
    headers: {
      Authorization: `vapid t=${jwt}, k=${vapid.publicKey}`,
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream",
      TTL: "86400",
      Urgency: "normal",
    },
    body: body as BodyInit,
  });
  return response.status;
}

// --- Entrypoint --------------------------------------------------------------

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Only the scheduled job may trigger sends
    const cronSecret = req.headers.get("x-cron-secret");
    const expectedSecret = Deno.env.get("PUSH_CRON_SECRET");
    if (!expectedSecret || cronSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY");
    const vapidPrivateJwkRaw = Deno.env.get("VAPID_PRIVATE_JWK");
    if (!vapidPublicKey || !vapidPrivateJwkRaw) {
      throw new Error("VAPID keys are not configured");
    }
    const vapid = {
      publicKey: vapidPublicKey,
      privateJwk: JSON.parse(vapidPrivateJwkRaw) as JsonWebKey,
      subject: "mailto:hello@cantworryaboutit.com",
    };

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    const { data: due, error } = await supabase.rpc("get_due_reminders");
    if (error) throw new Error(`Failed to load due reminders: ${error.message}`);

    const payload = {
      title: "Time for a gentle check-in",
      body: "Take a quiet moment to write in your CWAI journal.",
      url: "/journal",
    };

    let sent = 0;
    let removed = 0;
    let failed = 0;

    for (const sub of (due ?? []) as SubscriptionRow[]) {
      try {
        const status = await sendPush(sub, payload, vapid);
        if (status === 404 || status === 410) {
          // Subscription is gone or expired; clean it up
          await supabase.from("push_subscriptions").delete().eq("id", sub.id);
          removed++;
        } else if (status >= 200 && status < 300) {
          sent++;
        } else {
          logStep("Push service rejected", { id: sub.id, status });
          failed++;
        }
      } catch (err) {
        logStep("Send failed", { id: sub.id, message: (err as Error).message });
        failed++;
      }
    }

    logStep("Run complete", { due: due?.length ?? 0, sent, removed, failed });
    return new Response(JSON.stringify({ due: due?.length ?? 0, sent, removed, failed }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    logStep("Fatal error", { message: (err as Error).message });
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
