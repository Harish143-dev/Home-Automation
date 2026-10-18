// Self-unregistering Service Worker to clean up lingering localhost registrations
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll();
    }).then((clients) => {
      // Cleanly unregister
    })
  );
});
