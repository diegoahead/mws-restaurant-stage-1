var staticCacheName = 'restaurant-static-v5';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/mws-restaurant-stage-1/js/dbhelper.js',
        '/mws-restaurant-stage-1/js/main.js',
        '/mws-restaurant-stage-1/js/restaurant_info.js',
        '/mws-restaurant-stage-1/css/grid.css',
        '/mws-restaurant-stage-1/css/styles.css',
        '/mws-restaurant-stage-1/img/1.jpg',
        '/mws-restaurant-stage-1/img/2.jpg',
        '/mws-restaurant-stage-1/img/3.jpg',
        '/mws-restaurant-stage-1/img/4.jpg',
        '/mws-restaurant-stage-1/img/5.jpg',
        '/mws-restaurant-stage-1/img/6.jpg',
        '/mws-restaurant-stage-1/img/7.jpg',
        '/mws-restaurant-stage-1/img/8.jpg',
        '/mws-restaurant-stage-1/img/9.jpg',
        '/mws-restaurant-stage-1/img/10.jpg',
        '/mws-restaurant-stage-1/img/logo_top.svg'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-static-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});