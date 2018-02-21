import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { POSTS_PER_PAGE } from '@root/webconfig'

Vue.use( Vuex )

const state = {
  date: ( new Date() ).getTime(),
  postCount: 0,
  blogPull: false,
  blogPullTime: '',
  postsPerPage: POSTS_PER_PAGE,
  posts: [],
  menus: [],
  pages: {}
}

export default () => new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
