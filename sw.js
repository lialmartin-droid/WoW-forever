const CACHE='forever-companion-v21-20261019';
const FILES=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png','./icon.svg'];
self.addEventListener('install',ev=>{ev.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',ev=>{ev.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('forever-companion-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',ev=>{if(ev.request.method!=='GET'||new URL(ev.request.url).origin!==self.location.origin)return;ev.respondWith(fetch(ev.request).then(res=>{if(res.ok){const clone=res.clone();caches.open(CACHE).then(c=>c.put(ev.request,clone)).catch(()=>{})}return res}).catch(()=>caches.match(ev.request).then(res=>res||(ev.request.mode==='navigate'?caches.match('./index.html'):Response.error()))))});
