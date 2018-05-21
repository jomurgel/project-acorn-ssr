import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { POSTS_PER_PAGE } from '@root/webconfig'

Vue.use( Vuex )

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
    post: { // all posts
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

export default () => new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
