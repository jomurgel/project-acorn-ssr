import Vue from 'vue'

export default {
  // Pages
  SET_PAGE: ( state, { slug, page }) => {
    Vue.set( state.pages, slug, page )
  },
  // Menues
  SET_MENUS: ( state, menus ) => {
    state.navigation.menus = menus
  },
  SET_MENU_PULL_DATE: ( state, pullTime ) => {
    state.navigation.pullDate = pullTime
  },
  // Taxonomy
  SET_CATEGORIES: ( state, categories ) => {
    state.taxonomy.categories = categories
  },
  SET_CATEGORIES_PULL_DATE: ( state, pullTime ) => {
    state.taxonomy.pullDate = pullTime
  },
  // Archives
  SET_ARCHIVE: ( state, { type, ids, count }) => {

    const pageCount = count - 1

    Vue.set( state.archives[type].posts, pageCount, ids )

  },
  SET_ACTIVE_TYPE: ( state, type ) => {
    state.active.archive = type
  },
  SET_ACTIVE_CAT: ( state, catId ) => {
    state.active.category = catId
  },
  SET_ACTIVE_POST: ( state, id ) => {
    state.active.post = id
  },
  // Posts
  SET_POSTS: ( state, { posts }) => {

    posts.forEach( post => {
      if ( post ) {
        Vue.set( state.posts, post.id, post )
      }
    })
  },
  SET_POST_COUNT: ( state, { type, postCount }) => {
    state.archives[type].postCount = postCount
  },
  // Single Post
  SET_POST: ( state, { post }) => {
    if ( post ) {
      Vue.set( state.posts, post.id, post )
    }
  }
}
