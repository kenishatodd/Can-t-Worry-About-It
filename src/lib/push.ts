import { supabase } from "@/integrations/supabase/client";

// Public VAPID key — safe to ship in the client (it is the "publishable" half
// of the push keypair). The private key lives only in the backend.
export const VAPID_PUBLIC_KEY =
  "BO78FC-pifRPW_-vktRjpmzvql0Pq7YK_a1ydSlM02SKl5EzfvYEyINJlRsXvweqaUM62qw_KmhRAF60kzh7v20";

export type ReminderSettings = {
  endpoint: string;
  reminder_time: string; // "HH:MM:SS"
  timezone: string;
  enabled: boolean;
};

export function isPushSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// The push_subscriptions table was added by migration; generated Supabase
// types lag behind, so access it through a small untyped helper.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pushTable = () => (supabase as any).from("push_subscriptions");

async function getRegistration(): Promise<ServiceWorkerRegistration> {
  const registration = await Promise.race([
    navigator.serviceWorker.ready,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Service worker not ready")), 8000),
    ),
  ]);
  return registration as ServiceWorkerRegistration;
}

export async function getReminderSettings(): Promise<ReminderSettings | null> {
  const { data, error } = await pushTable()
    .select("endpoint, reminder_time, timezone, enabled")
    .limit(1);
  if (error) throw error;
  return (data?.[0] as ReminderSettings | undefined) ?? null;
}

export async function subscribeToReminders(
  reminderTime: string,
  timezone: string,
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("You need to sign in to enable reminders.");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  const registration = await getRegistration();
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
  });
  const keys = subscription.toJSON().keys ?? {};

  const { error } = await pushTable().upsert(
    {
      user_id: user.id,
      endpoint: subscription.endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
      reminder_time: reminderTime,
      timezone,
      enabled: true,
    },
    { onConflict: "endpoint" },
  );
  if (error) throw error;
}

export async function updateReminderTime(
  reminderTime: string,
  timezone: string,
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("You need to sign in to update reminders.");

  const { error } = await pushTable()
    .update({ reminder_time: reminderTime, timezone })
    .eq("user_id", user.id);
  if (error) throw error;
}

export async function unsubscribeFromReminders(): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const registration = await getRegistration();
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      if (user) {
        await pushTable().delete().eq("endpoint", subscription.endpoint);
      }
      await subscription.unsubscribe();
      return;
    }
  } catch {
    // Fall through to clearing the server-side row
  }

  if (user) {
    await pushTable().delete().eq("user_id", user.id);
  }
}
