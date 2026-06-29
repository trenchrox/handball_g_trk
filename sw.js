// Service worker för offline-stöd av Handboll Tracker
const CACHE_NAME = 'handboll-tracker-v1';
const FILES_TO_CACHE = [
  './handball_g_trk_ipad.html',
  './manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        // Spara en kopia av nya filer i cachen för nästa offline-tillfälle
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, copy);
        });
        return response;
      }).catch(function() {
        // Om både cache och nätverk saknas: fall tillbaka på huvudsidan
        return caches.match('./handball_g_trk_ipad.html');
      });
    })
  );
});
