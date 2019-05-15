/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "e748aea9b9108eab917020a422e6f5b8"
  },
  {
    "url": "api.html",
    "revision": "dd7eed58e4adbe412b31d124e0c44b3b"
  },
  {
    "url": "assets/css/0.styles.29e8c5ba.css",
    "revision": "ed67c8ef24a85f70aab7efa9c9de83c4"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.94537a5e.js",
    "revision": "6e739cd5aa1fa93034efe8aff5848573"
  },
  {
    "url": "assets/js/2.3ed85853.js",
    "revision": "4205b925e3d4afa163d587420d2c589b"
  },
  {
    "url": "assets/js/3.e8ce1da0.js",
    "revision": "d5ccbb750add460e195c124731df59af"
  },
  {
    "url": "assets/js/4.d5af16e1.js",
    "revision": "e8b25e0dd341e7b0a2e5bb185651ceab"
  },
  {
    "url": "assets/js/5.99ca4c61.js",
    "revision": "1c52b79c4064f2eaf71c9d0aec3db9fa"
  },
  {
    "url": "assets/js/6.8505dc30.js",
    "revision": "a35480f7cca8d4bd0b8319ed8696b253"
  },
  {
    "url": "assets/js/7.66ac1693.js",
    "revision": "0d48c39f445b553fda834115434020ea"
  },
  {
    "url": "assets/js/8.c914fec2.js",
    "revision": "b4471bc269858de6f19553d1dde8178e"
  },
  {
    "url": "assets/js/app.96c0f13a.js",
    "revision": "59d59091c2c3e5fda6f44f388b2e3acd"
  },
  {
    "url": "examples.html",
    "revision": "0a30ff8f71f268ada447314588853eb5"
  },
  {
    "url": "guide/binding.html",
    "revision": "96bb684117eae5ded192b9df27de0bea"
  },
  {
    "url": "guide/color-history.html",
    "revision": "32e720aefe796343d30f6221569acd8e"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "34d0fee158e9cfec63699db678d1e5e4"
  },
  {
    "url": "guide/index.html",
    "revision": "31652453c71f7cb5940e6621b70983a4"
  },
  {
    "url": "index.html",
    "revision": "bec9280eeeebddf0e823fbf045923a32"
  },
  {
    "url": "verte.png",
    "revision": "62230e64c80e22d25f2ccd33dbd427ed"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
