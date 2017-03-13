// var CACHE_NAME = "beppek-github-webhooks-v9";
// var urlsToCache = [
//   "/index.html",
//   "/assets/font-awesome/css/font-awesome.min.css",
//   "/static/js/bundle.js"
// ];

// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         console.log(cache);
//         // Open a cache and cache our files
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener("activate", function(event) {

//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.filter(function(cacheName) {
//           console.log(cacheName);
//           return cacheName.startsWith("beppek-github-webhooks-") && cacheName != CACHE_NAME;
//         }).map(function(cacheName) {
//           console.log(`${cacheName} from function that deletes`);
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );

// });

// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         })
//     );
// });

importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');
