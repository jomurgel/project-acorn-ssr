![acorn-vue](https://user-images.githubusercontent.com/5230729/33617130-23b70b74-d99c-11e7-8964-a3adaad9cf65.png)

*NOTE:* Though the core of this SPA works the page, posts, and single post pages still need hooked up to the API along with some other finessing as of 12/5/2017.

# Project Acorn + Vue.js
A Vue.js SPA built around the WordPress REST API intended to be used in conjunction with the [Project Acorn Theme](https://github.com/jomurgel/project-acorn).


<img src="https://img.shields.io/badge/version-1.0.0-green.svg" alt="Version 1.0.0" />

## Why?
With javascript applications there are some SEO, caching and extendability concerns that have arisen that I felt were necessary to address before really putting my weight behind [Vue.js](https://vuejs.org/). 

## What's included?
- Google Analytics baked in using [Vue Analytics](https://github.com/MatteoGabriele/vue-analytics).
- Loading animations appropriated from [Nuxt.js](https://nuxtjs.org/).
- Uses [SVG Sprite](https://github.com/jkphl/svg-sprite) to optimize and compile SVG icons into a single sprite for easy-use with some additional inspiration from [Vue SVG Sprite](https://www.npmjs.com/package/vue-svg-sprite) and [liamwang](https://github.com/liamwang/vue-ssr-starter).
- Vue + vue-router + vuex + axios working together
- WordPress REST API in action with post, pages, and menu endpoints.
- Compiling SASS/SCSS inside individual templates and also inside the `assets/styles` folder for a global stylesheet(s) if desired.
- Updated `.eslintrc.js` to keep things looking super clean.
- SSR Favicon via [https://www.npmjs.com/package/serve-favicon](serve-favicon), set in `siteconfig.js`.
- Open Graph and Twitter card support globally and per template component.

## SSR
- Client-side state w/ DOM hydration.
- Preload and prefetch resources.
- Server Side Rendering (of course).
- Server-side data pre-fetching (limited).

## Configure
Configure site default title, base url and development port in the `siteconfig.js` inside the root folder.

## Development
- Install: `npm install` or `yarn install` to install dependencies.

``` bash
#Node Dev Server
$ npm run dev

#Compile SVG Sprite
$ npm run svg

# Start Server in Production Mode
$ npm run start

# Production Build
$ npm run build
```

## Roadmap
- [ ] Get up to 100/100 Lighthouse score.
- [ ] Component-level caching for larger pages (posts).
- [ ] Apple Icon Support
- [ ] `manifest.json` Support.

## Referenced
- [liamwang/vue-ssr-starter](https://github.com/liamwang/vue-ssr-starter)
- [Nuxt.js](https://nuxtjs.org/)
- [vuejs/vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)

## License
[MIT](http://opensource.org/licenses/MIT)
