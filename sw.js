// Service worker för offline-stöd av Handboll Tracker
// Versionen kommer från APP_VERSION i HTML-filen, som registrerar den här filen som sw.js?v=<version>.
// Ny version => ny sw.js-URL => ny service worker => ny cache. Ändra aldrig versionen här.
const APP_VERSION = new URL(self.location.href).searchParams.get('v') || '0';
const CACHE_PREFIX = 'handboll-tracker-v';
const CACHE_NAME = CACHE_PREFIX + APP_VERSION;
const MAIN = './handball_g_trk_ipad.html';
const FILES_TO_CACHE = [
  MAIN,
  './manifest.json',
  './malvaktsstatistik-mall.pdf'
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

function isHtml(request) {
  return request.mode === 'navigate' ||
         (request.headers.get('accept') || '').indexOf('text/html') >= 0;
}

self.addEventListener('fetch', function(event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  // Appen hämtas nätverk-först. Annars skulle en ny version aldrig nå en iPad
  // som redan har appen: den gamla HTML-filen serveras ur cachen, den
  // registrerar samma sw.js?v=-URL, webbläsaren ser ingen ändring, och cachen
  // byts aldrig ut. Nätverk-först bryter den låsningen.
  if (isHtml(req)) {
    event.respondWith(
      fetch(req).then(function(response) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(req, copy); });
        return response;
      }).catch(function() {
        // Offline: ta den cachade appen
        return caches.match(req).then(function(hit) { return hit || caches.match(MAIN); });
      })
    );
    return;
  }

  // Allt annat (manifest, statistikmallen) cache-först — ändras sällan och ska gå snabbt.
  event.respondWith(
    caches.match(req).then(function(cached) {
      if (cached) return cached;
      return fetch(req).then(function(response) {
        // Spara en kopia av nya filer i cachen för nästa offline-tillfälle
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(req, copy);
        });
        return response;
      }).catch(function() {
        // Om både cache och nätverk saknas: fall tillbaka på huvudsidan
        return caches.match(MAIN);
      });
    })
  );
});
