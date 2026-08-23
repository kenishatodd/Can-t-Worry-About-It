const APP_SW_PATH = "/sw.js";

function isPreviewHost(hostname: string): boolean {
  return (
    hostname.startsWith("id-preview--") ||
    hostname.startsWith("preview--") ||
    hostname === "lovableproject.com" ||
    hostname.endsWith(".lovableproject.com") ||
    hostname === "lovableproject-dev.com" ||
    hostname.endsWith(".lovableproject-dev.com") ||
    hostname === "beta.lovable.dev" ||
    hostname.endsWith(".beta.lovable.dev")
  );
}

async function unregisterAppServiceWorkers(): Promise<void> {
  if (!("serviceWorker" in navigator)) return;
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations
        .filter((registration) => {
          const scriptURL =
            registration.active?.scriptURL ??
            registration.waiting?.scriptURL ??
            registration.installing?.scriptURL ??
            "";
          return scriptURL.endsWith(APP_SW_PATH);
        })
        .map((registration) => registration.unregister())
    );
  } catch {
    // Cleanup failures are non-fatal
  }
}

/**
 * Registers the offline service worker, but only in the real published app.
 * Never registers in dev, in the Lovable preview, or inside an iframe,
 * and cleans up any stale app service workers in those contexts.
 * Visiting the app with ?sw=off unregisters the service worker (kill switch).
 */
export function registerServiceWorker(): void {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  const params = new URLSearchParams(window.location.search);
  const refused =
    !import.meta.env.PROD ||
    window.self !== window.top ||
    isPreviewHost(window.location.hostname) ||
    params.get("sw") === "off";

  if (refused) {
    void unregisterAppServiceWorkers();
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(APP_SW_PATH).catch(() => {
      // Registration failures are non-fatal
    });
  });
}
