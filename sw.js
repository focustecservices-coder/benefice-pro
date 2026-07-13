const CACHE_NAME = 'benefice-pro-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json?v=2',
  './icon-192.png',
  './logo.png'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
     .then(cache => cache.addAll(urlsToCache))
     .then(() => self.skipWaiting())
  );
});

// Activation - supprime les anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName!== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
     .then(response => response || fetch(event.request))
  );
});
