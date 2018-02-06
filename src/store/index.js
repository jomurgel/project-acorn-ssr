import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import { generateGetters } from './getters'
Vue.use( Vuex )

const state = {
  date: Date.now(),
  posts: {},
  menus: [],
  pages: {}
}

const getters = generateGetters( Object.keys( state ) )

export default () => new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
