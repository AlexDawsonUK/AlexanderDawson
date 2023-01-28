// Pre-fetch on Install
var cacheName = "alexdawson-cache";
self.addEventListener("install", function(evt) {
	evt.waitUntil(precache());
});
function precache() {
	return caches.open(cacheName).then(function (cache) {
		// list all your assets in the array
		return cache.addAll([
			"/index.html",
			"/error.html",
			"/humans.txt",
		//	"/robots.txt",
			"/.well-known/security.txt",
			"/change.log",
			"/vcard.vcf",
			"/site.webmanifest",
			"/browserconfig.xml",
			"/feed.xml",
		//	"/sitemap.xml",
			"/cache/style.css",
			"/cache/script.js",
			"/cache/fonts/geomanist-bold.woff",
			"/cache/fonts/geomanist-bold.woff2",
			"/cache/fonts/geomanist-book.woff",
			"/cache/fonts/geomanist-book.woff2",
			"/cache/fonts/geomanist-medium.woff",
			"/cache/fonts/geomanist-medium.woff2",
			"/apple-touch-icon.png",
			"/images/banner.png",
			"/images/droidx192.png",
			"/images/droidx512.png",
			"/images/ms-tile.png",
			"/favicon.ico",
			"/sw.js",
		]);
	});
}
// Return from cache, Background refresh
self.addEventListener("fetch", function(evt) {
	evt.respondWith(fromCache(evt.request));
	evt.waitUntil(update(evt.request));
});
function fromCache(request) {
	return caches.open(cacheName).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject("no-match");
		});
	});
}
function update(request) {
	return caches.open(cacheName).then(function (cache) {
		return fetch(request).then(function (response) {
			return cache.put(request, response);
		});
	});
}