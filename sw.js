const CACHE = 'loca-v1';
const ASSETS = [
  '/disabled-rise/',
  '/disabled-rise/index.html',
  '/disabled-rise/profile.html',
  '/disabled-rise/signup.html',
  '/disabled-rise/login.html',
  '/disabled-rise/manifest.json',
  '/disabled-rise/icon-192.png',
  '/disabled-rise/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
