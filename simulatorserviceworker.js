function initSimulatorServiceWorker(){const e="@relprefix@".replace("---","").replace(/^\//,""),t=-1===e.indexOf("/"),r="makecode-sim;"+e+";@pxtRelId@",n=["@simUrl@","/pxt-phaser/pxtsim.js","/pxt-phaser/sim.js"].map((e=>e.trim())).filter((e=>!!e&&0!==e.indexOf("@")));self.setSimulatorWorkerOptions=e=>{var t;e&&Array.isArray(e.urls)&&n.push(...(t=e.urls,s(t.map((e=>e.trim())).filter((e=>!!e)))))};let i=!1;function s(e){const t=[];for(const r of e)-1===t.indexOf(r)&&t.push(r);return t}self.addEventListener("install",(e=>{if(t){i=!0;try{importScripts("@simworkerconfigUrl@")}catch(e){console.log("Failed to load target service worker config")}console.log("Installing service worker..."),e.waitUntil(caches.open(r).then((e=>(console.log("Opened cache"),e.addAll(s(n))))).then((()=>self.skipWaiting())))}else console.log("Skipping service worker install for unnamed endpoint")})),self.addEventListener("activate",(n=>{t?(console.log("Activating service worker..."),n.waitUntil(caches.keys().then((t=>{const n=t.filter((t=>{const n=function(e){const t=e.split(";");return 3!==t.length?null:t[1]}(t);return null===n||n===e&&t!==r}));return Promise.all(n.map((e=>caches.delete(e))))})).then((()=>i?(i=!1,function(){const t=self;return t.clients.claim().then((()=>t.clients.matchAll())).then((t=>{t.forEach((t=>t.postMessage({type:"serviceworker",state:"activated",ref:e})))}))}()):Promise.resolve())))):console.log("Skipping service worker activate for unnamed endpoint")})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((t=>t||fetch(e.request))))}))}initSimulatorServiceWorker();