import Vue from 'vue'

export default {
  setActivePosts: ( state, { posts, count }) => {
    Vue.set( state.posts, count, posts )
  },
  setPosts: ( state, [ posts, count ] ) => {

    posts.forEach( post => {
      if ( post ) {

        // Set page number value.
        post['pageNumber'] = count

        // Set object data into array.
        state.posts.push( post )
      }
    })
  },
  setPost: ( state, { slug, post }) => {
    state.posts.push( post )
  },
  setPostCount: ( state, count ) => {
    state.postCount = count
  },
  setBlogPullStatus: ( state, pull ) => {
    state.blogPull = pull
  },
  setBlogPullTimeStamp: ( state, pullTime ) => {
    state.blogPullTime = pullTime
  },
  setPage: ( state, { slug, page }) => {
    Vue.set( state.pages, slug, page )
  },
  setMenus: ( state, menus ) => {
    state.menus = menus
  },
  setMenuPullTimeStamp: ( state, pullTime ) => {
    state.menuPullTime = pullTime
  }
}
