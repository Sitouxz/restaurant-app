/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
import CacheHelper from './cache-helper';

const assetsToCache = [
  './',
  './icons/72x72.png',
  './icons/96x96.png',
  './icons/128x128.png',
  './icons/192x192.png',
  './icons/384x384.png',
  './icons/512x512.png',
  './index.html',
  './favicon.ico',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));

  event.respondWith(fetch(event.request));
});
