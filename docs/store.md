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

You can take a look at [Line 77](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/store/actions.js#L77), `getPosts` which handles the data retrieved from our api request.

``` javascript
if ( ( hasPage === false || postsLength === 0 ) && ! havePosts ) {
```

We are returning our vuex store unless we've met two criteria.

  1. We've not pulled our blog posts before AND our posts array length is 0.
  2. We have pulled posts before, but the date of that pull is greater than 24 hours.

If we do end up making a request, either initially, or subsiquently, we set several data points with our `commits` to update our vuex store. We, in this example, set the total post count, set our blog pull status to `true`, set the time of that pull and then send our data into the [mutations.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/store/mutations.js) file to tell our app where to store that data.

``` javascript
// Set total number of posts.
commit( 'setPostCount', totalPostCount )

// Set blog pull status to true.
commit( 'setBlogPullStatus', true )

// Set date of that pull.
commit( 'setBlogPullTimeStamp', ( new Date() ).getTime() )

// Set post data and page location.
commit( 'setPosts', [ posts, count ] )
```

## mutations.js


## getters.js
