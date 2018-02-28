# Vuex Store
The [vuex](https://vuex.vuejs.org/en/intro.html) store setup is built into four files.

  * [index.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/store/index.js)
  * [actions.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/store/actions.js)
  * [getters.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/store/getters.js)
  * [mutations.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/store/mutations.js)

## index.js
This file handles the state and the registartion of the new store.

``` javascript
const state = {
  postCount: 0, // populates total post count.
  blogPull: false, // the blog has been pulled.
  blogPullTime: '', // time of blog pull.
  postsPerPage: POSTS_PER_PAGE, // posts per page set from webconfig.js
  posts: [], // posts array.
  menus: [], // menu array.
  menuPullTime: '', // last pull of menu.
  pages: {} // page objects.
}
```

## actions.js
Our actions handles all of our API pulls for pages, single posts, all posts by page and menus.

You can get the idea of how actions work in general in the [vuex docs](https://vuex.vuejs.org/en/actions.html), but the important bits revolved around our data checks and our `commits` which influence our `getters` and `mutations`.