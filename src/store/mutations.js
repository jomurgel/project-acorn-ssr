import Vue from 'vue'

export default {
  setPosts: ( state, posts ) => {
    state.posts = posts
  },
  setPage: ( state, { slug, page }) => {
    Vue.set( state.pages, slug, page )
  },
  setMenus: ( state, menus ) => {
    state.menus = menus
  }
}
