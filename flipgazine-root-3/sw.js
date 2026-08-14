/* flipgazine service worker — installable + offline-capable */
/* v13 clears the old cache so the seamless flipbook entry/return shell and
   shared book transition assets cannot remain pinned behind cache-first. */
var V = 'fg-v13';
var CORE = ['/', '/index.html', '/favicon-v3.svg', '/manifest.webmanifest',
  '/icons/icon-192-v3.png', '/icons/icon-512-v3.png', '/icons/icon-512-maskable-v3.png',
  '/og/home-v2.png'];
var SB = 'https://sjpvhgxacsiorrtijqua.supabase.co/rest/v1';
var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcHZoZ3hhY3Npb3JydGlqcXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NDE5MjcsImV4cCI6MjA5OTMxNzkyN30.9rQa7r9pxoBwh5SrYLlBGzzvbZkkUXKdvahCPugZncY';
var HOME_DATA = [
  SB+'/site_files?path=eq.%2Fhome.html&select=content',
  SB+'/site_files?path=eq.%2Ffg-head.html&select=content',
  SB+'/site_files?path=eq.%2Ffg-header.html&select=content'
];

self.addEventListener('install', function(e){
  // NOTE: cache.addAll() is atomic — a single missing URL aborts the whole
  // install and leaves the app with no service worker (and therefore not
  // installable). Cache each entry independently instead.
  e.waitUntil(caches.open(V).then(function(c){
    var staticReady=Promise.all(CORE.map(function(u){
      return c.add(new Request(u, {cache: 'reload'})).catch(function(){});
    }));
    /* The shell itself is not the Home page: Home and its shared pre-paint head
       and header are database rows. Warm those exact public requests so the
       diamond Home link still has a complete first paint after an upgrade. */
    var dataReady=Promise.all(HOME_DATA.map(function(u){
      var req=new Request(u,{headers:{apikey:KEY,Authorization:'Bearer '+KEY},cache:'reload'});
      return fetch(req).then(function(res){
        return res.ok ? c.put(req,res) : null;
      }).catch(function(){});
    }));
    return Promise.all([staticReady,dataReady]);
  }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k!==V; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  /* Never intercept media. Audio and video elements issue HTTP range requests,
     and the Cache API cannot store the resulting 206 partial responses --
     cache.put() rejects. Worse, cloning a large streaming body to attempt it
     can stall the stream that is actually feeding playback, so tracks load
     forever and fail silently. Returning without respondWith() hands these
     straight to the browser, which knows how to range-request properly. */
  if (req.headers.get('range')) return;
  if (url.pathname.indexOf('/storage/v1/') !== -1) return;
  if (req.destination === 'audio' || req.destination === 'video') return;

  // navigations -> serve the shell (offline app-shell)
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(function(){ return caches.match('/index.html'); }));
    return;
  }
  // the manifest must never be served stale, or an old icon set sticks around
  if (url.origin === location.origin && url.pathname === '/manifest.webmanifest') {
    e.respondWith(fetch(req).catch(function(){ return caches.match(req); }));
    return;
  }
  // Supabase content -> network first, fall back to cache (offline reading)
  if (url.hostname.indexOf('supabase.co') !== -1) {
    e.respondWith(
      fetch(req).then(function(res){
        /* A 401/5xx is a network failure for public page delivery. Do not
           overwrite the last good row with it; use that row for this request. */
        if(!res.ok) return caches.match(req).then(function(cached){ return cached||res; });
        var cp=res.clone(); caches.open(V).then(function(c){ c.put(req, cp); }); return res;
      })
        .catch(function(){ return caches.match(req); })
    );
    return;
  }
  // same-origin static -> cache first
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(function(c){
      return c || fetch(req).then(function(res){ var cp=res.clone(); caches.open(V).then(function(cc){ cc.put(req, cp); }); return res; });
    }));
  }
});
