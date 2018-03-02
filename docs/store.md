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
[Vuex Reference: Actions](https://vuex.vuejs.org/en/actions.html).

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
[Vuex Reference: Mutations](https://vuex.vuejs.org/en/mutations.html).

Our mutations handle data as expected. A couple of caveats to their functionalyt.

The `setPage` mutation uses the [`Vue.set`](https://vuejs.org/v2/api/#Vue-set) function to adjust the object and `Array.push` to the store as we pull the data. We're only pulling page data here if the data is needed and not all at once.

``` javascript
setPage: ( state, { slug, page }) => {
  Vue.set( state.pages, slug, page )
},
```

The `setPosts` and `setActivePosts` functions works in a similar ways.

## getters.js
[Vuex Reference: Getters](https://vuex.vuejs.org/en/getters.html).

The getters for `pages` is pretty standard, returning the state array.

Our `posts` getter returns the state array, but does some extra checks to make sure that we're only returning unique results in the event that we visit a single post, but then visit the blog. Rather than dealing with duplicates at the time of pull, we're weeding out the posts in our getters here.

``` javascript
posts: ( state ) => {

  let unique = findUniquePost( state.posts )

  let newPostsArray = state.posts.forEach( ( post, index ) => {

    if ( post && post['pageNumber'] === 0 && unique === false ) {
      state.posts.splice( index, 1 )
    }
  })

  return newPostsArray
}
```

Our `activePosts` getter returns posts from our `posts` array which also share the page parameter with our blog.

``` javascript
activePosts: ( state ) => {

  const page = parseInt( state.route.params.page ) || 1

  let activePosts = state.posts.filter( e => {
    return e.pageNumber === page
  })

  return activePosts
}
```

Our `singlePosts` getter returns a single post who's slug matches the slug in the `posts` array.

``` javascript
singlePost: ( state ) => {

  const post = state.route.params.slug

  let singlePost = state.posts.filter( e => {
    return e.slug === post
  })

  return singlePost[0]
}
```
