const CACHE_DATA = 'offline-data';

const STATIC_RESOURCES = ['index.html', 'app.js', 'logo.png'];

// install service worker
self.addEventListener('install', async (e) => {
  console.log('SW install');

  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_DATA);
      return await cache.addAll(STATIC_RESOURCES);
    })()
  );

  self.skipWaiting();
});

// listen for fetching request
self.addEventListener('fetch', async (e) => {
  console.log(`SW fetch: ${e.request.url}`);

  e.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_DATA);
      try {
        const networkRsponse = await fetch(e.request);
        await cache.put(e.request, networkRsponse.clone());
        return networkRsponse;
      } catch (error) {
        const cachedResponse = await cache.match(e.request);
        return cachedResponse;
      }
    })()
  );
});

// activate the service worker
self.addEventListener('activate', async (e) => {
  console.log(`SW activated`);
});
