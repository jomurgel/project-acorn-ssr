![acorn-vue](https://user-images.githubusercontent.com/5230729/33617130-23b70b74-d99c-11e7-8964-a3adaad9cf65.png)

# Project Acorn + Vue.js
A Vue.js SPA and PWA built around the WordPress REST API intended to be used in conjunction with the [Project Acorn Theme](https://github.com/jomurgel/project-acorn), but  can also be used as a SPA.

<img src="https://img.shields.io/badge/version-1.0.0-green.svg" alt="Version 1.0.0" />

[demo](https://node.jomurgel.com/)

## Why?
With javascript applications there are some SEO, caching, and extendability concerns that have arisen that I felt were necessary to address before really putting my weight behind [Vue.js](https://vuejs.org/). I don't really feel like there is a point to building a javascript website if you're not discoverable on the web, or Google/Bing search accomodating. This solves many of those problems.

## What's included?
- Google Analytics baked in using [Vue Analytics](https://github.com/MatteoGabriele/vue-analytics).
- Loading animations appropriated from [Nuxt.js](https://nuxtjs.org/).
- Uses [SVG Sprite](https://github.com/jkphl/svg-sprite) to optimize and compile SVG icons into a single sprite for easy-use with some additional inspiration from [Vue SVG Sprite](https://www.npmjs.com/package/vue-svg-sprite) and [liamwang](https://github.com/liamwang/vue-ssr-starter).
- Vue + [vue-router](https://router.vuejs.org/en/) + [vuex](https://vuex.vuejs.org/en/intro.html) + [axios](https://github.com/axios/axios) working together
- WordPress REST API in action with post, pages, and menu endpoints.
- Compiling SASS/SCSS inside individual templates and also inside the `assets/styles` folder for a global stylesheet(s) if desired.
- Updated `.eslintrc.js` to keep things looking super clean.
- SSR Favicon via [https://www.npmjs.com/package/serve-favicon](serve-favicon), set in `webconfig.js`.
- Open Graph and Twitter card support globally and per template component.  UPdates meta title, description, image, etc.

## 404 Handling
- As part of the `meta()` function you have the ability to set the `statusCode` to `404`.
- If I'm wrong please open an issue, but I don't believe that the [Vue Router's](https://router.vuejs.org/en/) 404/fallback handling is intended to be used the way that this app is built, in that pages and blog posts utilize the `/:slug` convention. This means that `/about` and `/d;ljdf` are both considered slugs and only one, in this example, is valid.
- The `Page.vue` and `Single.Vue` templates runs a check on `beforeRouteUpdate` against the store data to confirm that the slug is valid else redirects to the `404.vue` component.
- The Router `index.js` file does a `beforeEnter` check utlizing an API request and runs a similar check. I don't feel like this is an optimal use of an API request, but as the store data is not yet available, it is a necessary evil. These requests are only made between component chaneges. Line item added to roadmap below.

## SSR
- Async data/api fetching.
- Client-side state w/ DOM hydration.
- Preload and prefetch resources.
- Server Side Rendering (of course).
- Server-side data pre-fetching (limited).
- Set `statusCode` in `meta` to return HTTP status code other than 200.
- Service Worker using [https://github.com/goldhand/sw-precache-webpack-plugin](sw-precache-webpack-plugin).

![Lighthouse Score So Far](https://user-images.githubusercontent.com/5230729/35288237-5affd8d0-0021-11e8-9f84-c994a52ea92a.png)

## Configure
Configure site port, default title, description, share image, site url, base url,favicon, author, and author url in the `webconfig.js` inside the root folder.

## Development
- Install: `npm install` or `yarn install` to install dependencies.

``` bash
#Node Dev Server
$ npm run dev

#Compile SVG Sprite
$ npm run svg

# Production Build
$ npm run build

# Start Server in Production Mode
$ npm run start

# Build and run in production mode.
$ npm run go
```

## Roadmap
- [ ] Increase [https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en](Lighthouse) score within the Progressive Web App.
- [ ] Component-level caching for larger pages/posts.
- [ ] Better documentation.
- [ ] Better 404/Error handling within router. Limit requests.
- [x] Only fetch api if we don't have data.
- [ ] Put time limit on api fetching.

## Referenced
- [liamwang/vue-ssr-starter](https://github.com/liamwang/vue-ssr-starter)
- [Nuxt.js](https://nuxtjs.org/)
- [vuejs/vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)

## License
[MIT](https://opensource.org/licenses/MIT)
