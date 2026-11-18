// Nor Zvartnots Hayat — служебный файл приложения: всё берётся из сети; без сети — последняя сохранённая страница
const C = 'nzh-v6';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.add('./'))); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(C).then(c => c.put('./', k)); return r; })
    .catch(() => caches.match('./')));
});
