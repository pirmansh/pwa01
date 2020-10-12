const CACHE_NAME = "cache-v1";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/blog.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/app.js",
    "/manifest.json",
    "/fall.json",
    "/img/icons/android-icon-144x144.png",
    "/img/icons/android-icon-192x192.png",
    "/img/icons/android-icon-36x36.png",
    "/img/icons/android-icon-48x48.png",
    "/img/icons/android-icon-72x72.png",
    "/img/icons/android-icon-96x96.png",
    "/img/icons/apple-icon-114x114.png",
    "/img/icons/apple-icon-120x120.png",
    "/img/icons/apple-icon-152x152.png",
    "/img/icons/apple-icon-180x180.png",
    "/img/icons/apple-icon-76x76.png",
    "/img/icons/apple-icon-72x72.png",
    "/img/icons/apple-icon-60x60.png",
    "/img/icons/apple-icon-57x57.png",
    "/icon.png",
    "/img/banner/banner.svg",
    "/img/banner/banner-footer.svg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName != CACHE_NAME
                }).map(function(cacheName){
                    return caches.delete(cacheName)
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {

    var request = event.request;
    var url = new URL(request.url);

    if(url.origin === location.origin){
        event.respondWith(

            caches.match(request).then(function(response){
                return response || fetch(request)
            })

        );
    } else {

        event.respondWith(
            caches.open('blog-cache').then(function(cache){
                return fetch(request).then(function(LiveResp){
                    cache.put(request, LiveResp.clone())
                    return LiveResp
                }).catch(function(){
                    return caches.match(request).then(function(response){
                        if(response) return response
                        return caches.match('/fall.json')
                    })
                })
            })
        )
    }



    // event.respondWith(
    //     caches
    //     .match(event.request, {
    //         cacheName: CACHE_NAME
    //     })
    //     .then(function (response) {
    //         if (response) {
    //             console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
    //             return response;
    //         }

    //         console.log(
    //             "ServiceWorker: Memuat aset dari server: ",
    //             event.request.url
    //         );
    //         return fetch(event.request);
    //     })
    // );
});