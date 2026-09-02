/* =========================================================
   SERVICE WORKER
   Integrations-Navigator München

   Sorgt dafür, dass die App:
   - installierbar ist (PWA-Voraussetzung)
   - auch offline / bei schlechtem Empfang funktioniert
========================================================= */

const CACHE_NAME = "integrations-navigator-v1";

const DATEIEN_ZUM_CACHEN = [
    "./",
    "./index.html",
    "./index.css",
    "./index.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


/* =========================================================
   INSTALLATION
   Dateien vorab in den Cache legen.
========================================================= */

self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(DATEIEN_ZUM_CACHEN);
        })
    );

    self.skipWaiting();

});


/* =========================================================
   AKTIVIERUNG
   Alte Caches von früheren Versionen löschen.
========================================================= */

self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );

    self.clients.claim();

});


/* =========================================================
   ANFRAGEN ABFANGEN

   Strategie: "Cache first, dann Netzwerk"
   -> App funktioniert auch offline.
   Bei Erfolg wird die Netzwerk-Antwort zusätzlich
   im Cache aktualisiert.
========================================================= */

self.addEventListener("fetch", (event) => {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((gecachteAntwort) => {

            if (gecachteAntwort) {
                return gecachteAntwort;
            }

            return fetch(event.request)
                .then((netzwerkAntwort) => {

                    const kopie = netzwerkAntwort.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, kopie);
                    });

                    return netzwerkAntwort;

                })
                .catch(() => {
                    // Offline und nicht im Cache:
                    // bei Seitenaufrufen die Startseite anzeigen
                    if (event.request.mode === "navigate") {
                        return caches.match("./index.html");
                    }
                });

        })
    );

});
