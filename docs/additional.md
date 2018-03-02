# Additional Notes
There are a few things throughout that have been customized beyond the default [vue-ssr](https://ssr.vuejs.org/en/) implementation.

## Analytics
Google Analytics baked in using [Vue Analytics](https://github.com/MatteoGabriele/vue-analytics).

Simply add your Google Analytics code to the [app.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/app.js) file on [Line 43](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/app.js#L43).

## SSR
  * Async data/api fetching.
  * Client-side state w/ DOM hydration.
  * Preload and prefetch resources.
  * Server Side Rendering (of course).
  * Server-side data pre-fetching (limited).
  * Set `statusCode` in `meta` to return HTTP status code other than 200.
  * Service Worker using [https://github.com/goldhand/sw-precache-webpack-plugin](sw-precache-webpack-plugin).