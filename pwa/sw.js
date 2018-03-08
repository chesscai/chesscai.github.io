"use strict";var precacheConfig=[["index.html","f49cab68d9bd0d8995c1409844c2cc55"],["register.js","f95db916f5782f75c2ef0f8a8e60c777"],["register.simple.js","0b3807b844d4d9d2c6cfd27493a776ad"],["static/appicon_144.png","93541709a9a758b61e5b309e9d0449a2"],["static/appicon_48.png","7a62497fc2e0de8995ccd63a72ea348f"],["static/appicon_96.png","06e2abb45f96747891aabe67b5df57ce"],["static/css/app.5ca74b944309e32850b8c4adf1a1f030.css","9b855e7e49f4a602a5bf4e7417e4ea1a"],["static/favicon.png","2878da9f5a61e63ad834f79c77bdcaf9"],["static/img/chess.3af45aa.png","3af45aa0ed8a2db5218256dfd919b00d"],["static/img/pwa-reliable.b821467.png","b8214676408fdcfe922afef51ef51414"],["static/js/0.f2e0e332bba78b9937ad.js","f27e33c0eb1f24198bc3948151ac9270"],["static/js/1.fe5082821d03da867538.js","d2f5ff39dbd935f87f587294c1cdff41"],["static/js/app.2b99d5c468d316f3de8c.js","92384cd9b66ac27bd44cb6909522a27b"],["static/js/manifest.13ad1dc817b41b83756e.js","2e55e213a46190ad1d7403fa7d21d1c3"],["static/js/vendor.15486dd6fabc71b88a65.js","1ec3cf31a44b917ee2dbe5422d5accbb"],["static/unsubscribe.png","0aa3df3172ac390ad93eee4d10203346"],["sw.js","1b11162b50da988db31752eeceaa5fa2"]],cacheName="vue-pwa-v3-vue-pwa-"+(self.registration?self.registration.scope:""),assetHostPattern=/\/\/(ftest\.3g\.net\.cn)/,ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,!1);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("push",function(e){if(self.Notification&&"granted"===self.Notification.permission){var t={};e.data&&((t=e.data.json()).data={},t.data.url=t.url),console.log(t),e.waitUntil(self.registration.showNotification(t.title,t))}}),self.addEventListener("notificationclick",function(e){e.notification.close();var t=e.notification.data.url;t&&e.waitUntil(clients.matchAll({type:"window"}).then(function(e){for(var n=0;n<e.length;n++){var a=e[n];if("/"==a.url&&"focus"in a)return a.focus()}if(clients.openWindow)return clients.openWindow(t)}))}),self.addEventListener("fetch",function(e){if(assetHostPattern.test(e.request.url)){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),a="index.html";(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),t=urlsToCacheKeys.has(n));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});