import Vue from 'vue'

export default {
  setPosts: ( state, { posts }) => {
    posts.forEach( post => {
      if ( post ) {
        Vue.set( state.posts, post.slug, post )
      }
    })
  },
  setBlogPullStatus: ( state, blogPull ) => {
    state.blogPull = blogPull
  },
  setBlogPullTimeStamp: ( state, blogPullDate ) => {
    state.blogPullDate = blogPullDate
  },
  setPage: ( state, { slug, page }) => {
    Vue.set( state.pages, slug, page )
  },
  setMenus: ( state, menus ) => {
    state.menus = menus
  }
}
