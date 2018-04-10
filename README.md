<p align="center">
	<img src="https://user-images.githubusercontent.com/5230729/33617107-17ebf23c-d99c-11e7-8aa6-ec559bd23027.png" alt="project acorn" title="project acorn" />
</p>
<h1 align="center">Project Acorn + Vue.js</h1>
<p align="center">
	<img src="https://img.shields.io/badge/version-1.0.1-green.svg" alt="Version 1.0.1" />
</p>

This is a simple-ish [Vue.js](https://vuejs.org/) SPA and PWA built around the WordPress REST API utilizing [vue-router](https://router.vuejs.org/en/), [vuex](https://vuex.vuejs.org/en/intro.html), and [axios](https://github.com/axios/axios), intended to be used in conjunction with the [Project Acorn Theme](https://github.com/jomurgel/project-acorn), but can also be used independantly as a SPA with some modification.

Some extra bells and whistles from [SVG Sprite](https://github.com/jkphl/svg-sprite) and [Nuxt.js](https://nuxtjs.org/).

I intended to build a website framework for the "real world" which handles analytics, SEO considerations, speed optimizations, server-side rendering, and better 404 handling.

![Lighthouse Score So Far](https://user-images.githubusercontent.com/5230729/36620553-da7efd3c-18b0-11e8-9602-b19d485bccab.jpg)

## Table of Contents
  * [Getting Started](#getting-started)
  * [Documentation](#documentation)
  * [Contributing](#contributing)
  * [Roadmap](#roadmap)
  * [Credits](#credits)
  * [Changelog](#changelog)
  * [License](#license)

## Getting Started
``` bash
$ npm install
```

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

View and test at [http://localhost:8080](http://localhost:8080).

## Documentation
Check out a [demo](https://node.jomurgel.com/) or get started with the documentation below.

  * [Installation](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/installation.md)
  * [API Handling](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/api.md)
  * [Routing](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/router.md)
  * [Vuex Store](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/store.md)
  * [Utilities](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/utilities.md)
  * [Views & Components](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/views.md)
  * [Additional Notes](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/additional.md)

## Contributing
Contributions welcome. At this moment, other than adhering to the `.eslintrc` standards, normal Github processes apply. Branch from master or fork repo and issue pull request for review. New ideas, refactoring, or additional features are always welcome.

## Roadmap
I've got big plans to keep this thing going and updated with updates to [vue.js](https://vuejs.org/v2/guide/), [vue-ssr](https://ssr.vuejs.org/en/), [vue-router](https://router.vuejs.org/en/), and [vuex](https://vuex.vuejs.org/en/intro.html). Feel free to [submit a ticket](https://github.com/jomurgel/project-acorn-ssr/issues) to add to the list below.

- [ ] Internazionalization
- [ ] Optimize webpack/bundling.
- [ ] There's got to be a better way to handle 404s with the WordPress API.

## Credits
- [nuxt.js](https://nuxtjs.org/)
- [vuejs/vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)
- [Eric Fuller](https://github.com/efuller) for helping cleanup and refactor all the things.

## Changelog
Full [changelog here](https://github.com/jomurgel/project-acorn-ssr/blob/master/CHANGELOG.md).

## License
[MIT](https://opensource.org/licenses/MIT)
