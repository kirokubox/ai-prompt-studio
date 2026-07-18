const CACHE_NAME = "ai-prompt-studio-cache-__BUILD_VERSION__";
const APP_SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/ai-prompt-studio-icon-192.png", "./icons/ai-prompt-studio-icon-512.png", "./icons/apple-touch-icon.png"];
const APP_FALLBACK = new URL("index.html", self.registration.scope);

self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))));
self.addEventListener("activate", (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("message", (event) => { if (event.data?.type === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(APP_FALLBACK, copy)); return response; }).catch(() => caches.match(APP_FALLBACK)));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)); return response; })));
});
