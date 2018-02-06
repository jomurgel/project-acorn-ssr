import Vue from 'vue'

export default {
  setPost: ( state, { slug, post }) => {
    Vue.set( state.posts, slug, post )
  },
  setPosts: ( state, { posts }) => {
    posts.forEach( post => {
      if ( post ) {
        Vue.set( state.posts, post.slug, post )
      }
    })
  },
  setPage: ( state, { slug, page }) => {
    Vue.set( state.pages, slug, page )
  },
  setMenus: ( state, menus ) => {
    state.menus = menus
  }
}
