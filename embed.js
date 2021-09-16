(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-phaser/",
    "verprefix": "",
    "workerjs": "/pxt-phaser/worker.js",
    "monacoworkerjs": "/pxt-phaser/monacoworker.js",
    "gifworkerjs": "/pxt-phaser/gifjs/gif.worker.js",
    "serviceworkerjs": "/pxt-phaser/serviceworker.js",
    "typeScriptWorkerJs": "/pxt-phaser/tsworker.js",
    "pxtVersion": "7.1.25",
    "pxtRelId": "localDirRelId",
    "pxtCdnUrl": "/pxt-phaser/",
    "commitCdnUrl": "/pxt-phaser/",
    "blobCdnUrl": "/pxt-phaser/",
    "cdnUrl": "/pxt-phaser/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "phaser",
    "simUrl": "/pxt-phaser/simulator.html",
    "simserviceworkerUrl": "/pxt-phaser/simulatorserviceworker.js",
    "simworkerconfigUrl": "/pxt-phaser/workerConfig.js",
    "partsUrl": "/pxt-phaser/siminstructions.html",
    "runUrl": "/pxt-phaser/run.html",
    "docsUrl": "/pxt-phaser/docs.html",
    "multiUrl": "/pxt-phaser/multi.html",
    "asseteditorUrl": "/pxt-phaser/asseteditor.html",
    "skillmapUrl": "/pxt-phaser/skillmap.html",
    "isStatic": true
};

    var scripts = [
        "/pxt-phaser/highlight.js/highlight.pack.js",
        "/pxt-phaser/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/pxt-phaser/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/pxt-phaser/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/pxt-phaser/target.js");
    scripts.push("/pxt-phaser/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.initCallbacks = pxtCallbacks
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
