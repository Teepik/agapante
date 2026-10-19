/* Service worker de la page Études : lecture hors ligne, limité à /etudes.
 * La page passe par le réseau d'abord (pour rester à jour) et retombe sur la copie gardée hors connexion ;
 * les fichiers versionnés de Next.js (/_next/static) se servent depuis le cache. */
const VERSION = "etudes-v3";
const PAGE = "/etudes";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then((c) => c.addAll([PAGE, "/etudes.webmanifest", "/etudes-icon-192.png"]))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("etudes-") && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // La page : réseau d'abord, copie hors ligne ensuite.
  if (req.mode === "navigate" && url.pathname.startsWith(PAGE)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(PAGE, copy));
          return res;
        })
        .catch(() => caches.match(PAGE)),
    );
    return;
  }

  // Fichiers versionnés de Next.js et données de la page : cache d'abord.
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/etudes-")) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(VERSION).then((c) => c.put(req, copy));
            }
            return res;
          }),
      ),
    );
  }
});
