// Service worker för offline-stöd av Handboll Tracker
// Versionen kommer från APP_VERSION i HTML-filen, som registrerar den här filen som sw.js?v=<version>.
// Ny version => ny sw.js-URL => ny service worker => ny cache. Ändra aldrig versionen här.
const APP_VERSION = new URL(self.location.href).searchParams.get('v') || '0';
const CACHE_PREFIX = 'handboll-tracker-v';
const CACHE_NAME = CACHE_PREFIX + APP_VERSION;
const FILES_TO_CACHE = [
  './handball_g_trk_ipad.html',
  './manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // cache:'reload' går förbi webbläsarens HTTP-cache så att vi säkert får den nya filen
      return cache.addAll(FILES_TO_CACHE.map(function(url) { return new Request(url, { cache: 'reload' }); }));
    })
  );
  self.skipWaiting();
});

// Rör bara Cache API (gamla versioner av den här appens cache). IndexedDB och localStorage berörs aldrig.
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME; })
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
