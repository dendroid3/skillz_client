// Name of the cache storage
const CACHE_NAME = 'my-app-cache-v1';

// Files to cache during the install step
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css',
  // Add other critical assets here
];

// Install event - Cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// Activate event - Clean up old caches if needed
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - Intercept network requests and serve from cache if available
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Ensure that the request is from a valid HTTP/HTTPS origin, and not from chrome-extension:// or other unsupported schemes
  if (requestUrl.protocol === 'http:' || requestUrl.protocol === 'https:') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // If there's a cached response, return it
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from the network
        return fetch(event.request).then((response) => {
          // Optionally, cache the new response
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
    );
  } else {
    // If the request comes from an unsupported scheme (like chrome-extension://), don't cache it
    event.respondWith(fetch(event.request));
  }
});
