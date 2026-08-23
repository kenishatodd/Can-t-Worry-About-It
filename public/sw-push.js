// Push messaging handler, imported by the app service worker (/sw.js).
// Shows gentle journal reminders and opens the journal when tapped.

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {};
  }

  const title = data.title || "CWAI";
  const options = {
    body: data.body || "Take a quiet moment to check in with yourself.",
    icon: "/icons/icon-192.png",
    badge: "/favicon.png",
    tag: "cwai-journal-reminder",
    renotify: false,
    data: { url: data.url || "/journal" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || "/journal";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if ("focus" in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }
        return clients.openWindow(targetUrl);
      }),
  );
});
