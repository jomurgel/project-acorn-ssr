import Vue from 'vue'

export default {
  setPosts: ( state, [ posts, count ] ) => {
    posts.forEach( post => {
      if ( post ) {

        // Set object data into array.
        state.posts.push( post )

        // Set page number value.
        post['pageNumber'] = count
      }
    })
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
  }
}
