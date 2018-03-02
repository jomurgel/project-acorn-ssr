# Additional Notes
There are a few things throughout that have been customized beyond the default [vue-ssr](https://ssr.vuejs.org/en/) implementation.

## Analytics
Google Analytics baked in using [Vue Analytics](https://github.com/MatteoGabriele/vue-analytics).

Simply add your Google Analytics code to the [app.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/app.js) file on [Line 43](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/app.js#L43).

## SCSS
The webpack config has been setup to compile the `scss` languge within components.

Usage
``` javascript
<style lang="scss" global>
```

It also contains global styleshets at `root > assets > scss` which are importat globally in [_App.vue](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/_App.vue) and compiled alongside all the other template styles.

Usage
``` javascript
// Import global styles.
@import '~styles';
```

## SSR
This app renders client and server using the [vue-ssr](https://ssr.vuejs.org/en/) documentation and implements a service worker using [https://github.com/goldhand/sw-precache-webpack-plugin](sw-precache-webpack-plugin).