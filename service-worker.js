// service-worker.js

const cacheName = 'my-site-cache-v1';
const offlinePage = 'unreachable.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        '/',
        'index.html',
        'unreachable.html',
        // Add other files or assets you want to cache
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match(offlinePage);
    })
  );
});
