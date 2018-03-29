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
  posts: {},
  navigation: {
    pullDate: '',
    menus: [] // array of menus.
  }, // array of menus.
  pages: {}, // page objects.
  postsPerPage: POSTS_PER_PAGE,
  taxonomy: {
    pullDate: '',
    categories: [] // array of categories.
  },
  active: {
    archive: '', // current archive.
    category: '', // active category
    post: '' // active post.
  },
  // posts: {}, // post objects
  archives: {
    blog: { // all posts
      postCount: '', // int.
      posts: [] // array of objects.
    },
    vue: { // category name — in this case a category named category.
      postCount: '', // int.
      posts: [] // array of objects.
    }
  },
  cpt: { // all cpts.
    placeholder: { // custom post type slug.
      postCount: '', // int.
      posts: [] // array of objects.
    }
  }
}
```

The only manual requirement at this moment is the archives object. In order for a category to work it must be registered in the state object. `/category/vue` will product an archive while `/category/another-category/` will not unless it's added to the archives object.

The default check for whether or not the blog is the blog is based on the name of page, the name of the route, and the name of the main `blog` object in the archives object. If you want to change the name of the blog to, let's say, `writing`, you'll need to change it in the state and in the routes.

## actions.js
[Vuex Reference: Actions](https://vuex.vuejs.org/en/actions.html).

Our actions handles all of our API pulls for pages, single posts, all posts by page and menus.

You can get the idea of how actions work in general in the [vuex docs](https://vuex.vuejs.org/en/actions.html), but the important bits revolved around our data checks and our `commits` which influence our `getters` and `mutations`.

You can start at [Line 110](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/store/actions.js#L110), `getPosts` which handles the data retrieved from our api request.

``` javascript
if ( objectSize( state.archives[type].posts[( count - 1 )] ) === 0 ) {
// and
if ( objectSize( state.archives[type].posts[count] ) > 0 ) {
```

We are returning our vuex store unless we've met two criteria.

  1. We've not pulled our blog posts before AND our posts array length is 0.
  2. We have pulled posts before, but the date of that pull is greater than 24 hours.

If we do end up making a request, either initially, or subsiquently, we set several data points with our `commits` to update our vuex store. We, in this example, set the total post count, set our blog pull status to `true`, set the time of that pull and then send our data into the [mutations.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/store/mutations.js) file to tell our app where to store that data.

``` javascript
// Set ids by type.
commit( 'SET_ARCHIVE', { type, ids, count })

// Set total number of posts.
commit( 'SET_POST_COUNT', { type, postCount })

// Set post data and page location.
commit( 'SET_POSTS', { posts })
```

We need to always set our Active Category and Type regardless if we have a category (are in category).

``` javascript
// Set active type.
commit( 'SET_ACTIVE_TYPE', type )

if ( catId ) {
  // Set active category if it exists.
  commit( 'SET_ACTIVE_CAT', catId )
}
```

I've tried my best to document how things work, so I'd recommend checking the file out, and you can always throw me a message or [open an issue](https://github.com/jomurgel/project-acorn-ssr/issues) if you have any questions or better ways of doing something.

## mutations.js
[Vuex Reference: Mutations](https://vuex.vuejs.org/en/mutations.html).

Our mutations handle data as expected. A couple of caveats to their functionalyt.

The `SET_POSTS` mutation uses the [`Vue.set`](https://vuejs.org/v2/api/#Vue-set) function to adjust the object and `Array.push` to the store as we pull the data. We're only pulling page data here if the data is needed and not all at once.

``` javascript
// Posts
SET_POSTS: ( state, { posts }) => {

  posts.forEach( post => {
    if ( post ) {
      Vue.set( state.posts, post.id, post )
    }
  })
},
```

The `SET_POST` or `SET_ARCHIVE` functions works in a similar ways.

## getters.js
[Vuex Reference: Getters](https://vuex.vuejs.org/en/getters.html).

The getters for `pages` is pretty standard, returning the state array.

Our `activeIds` getter returns an array of ids for the given page. This gets used in the `activePosts` getter below in order to display posts by page on our archives.

``` javascript
// set active ids for use in pagination.
activeIds: ( state ) => {
  const { active, archives } = state

  if ( ! active.archive ) {
    return ''
  }

  const page  = Number( state.route.params.page ) || 1
  const count = page - 1

  return archives[active.archive].posts[count]
},
```

Our `activePosts` getter returns posts from our `posts` object that matches ids from our `activeIds` gettter above.

``` javascript
// items that should be currently displayed.
// this Array may not be fully fetched.
activePosts: ( state, getters ) => {
  if ( getters.activeIds ) {
    return getters.activeIds.map( id => {
      return state.posts[id]
    })
  }
},
```

Bot the `activeIds` and `activePosts` getters were unintentionally built in a very similar way to the Vue.js [hackernews 2.0 clone](https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/store/getters.js#L4) which you can check out here. I guess you research enough and things just get stuck in your brain. 😜

Our `singlePosts` getter returns a single post based on the slug of the active post set by the `SET_ACTIVE_POST` mutation.

``` javascript
// Set single post by id.
singlePost: ( state ) => {
  return state.posts[state.active.post]
}
```
