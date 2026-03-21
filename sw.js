/* ============================================================
   sw.js — Oshanda Geethanjana Portfolio Service Worker
   PWA offline support & caching (Network First Strategy)
   ============================================================ */

const CACHE_NAME = 'whitecoder-v3'; /* Cache version v3 — blog.html add කළා */
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/projects.html',
  '/contact.html',
  '/blog.html',      /* Blog page — blog page cache */
  '/404.html',
  '/shared.js',
  '/manifest.json',
  '/assets/profile.jpg'
];

/* Install — Force immediate activation */
self.addEventListener('install', event => {
  self.skipWaiting(); // අලුත් Service Worker එක වහාම ක්‍රියාත්මක කරයි
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

/* Activate — Clean old caches (v1 මකා දමයි) */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // සියලුම පිටු වල පාලනය වහාම ලබා ගනී
});

/* Fetch — NETWORK FIRST, Fallback to Cache */
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Network එකෙන් අලුත් ෆයිල් එක ආවොත්, ඒක Cache එකටත් සේව් කරනවා
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return response; // හැමතිස්සෙම අලුත් පිටුව පෙන්වයි
      })
      .catch(() => {
        // Internet නැති වෙලාවට විතරක් Cache එකෙන් පෙන්වයි
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          return caches.match('/404.html');
        });
      })
  );
});