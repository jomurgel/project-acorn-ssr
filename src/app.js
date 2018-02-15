import Vue from 'vue'
import App from '_App'
import VueAnalytics from 'vue-analytics'
import Common from './views/common'
import createStore from './store'
import createRouter from './router'
import { sync } from 'vuex-router-sync'
import metaMixin from './utilities/metaMixin'
import * as filters from './utilities/filters'

Vue.config.productionTip = false

// Setup analytics.
Vue.use( VueAnalytics, {
  id: 'UA-XXXXX-X'
})

// mixin for handling head meta
Vue.mixin( metaMixin )

// common components
Vue.use( Common )

// register global utility filters.
Object.keys( filters ).forEach( key => {
  Vue.filter( key, filters[key] )
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp( ssrContext ) {

  // create store and router instances
  const store  = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync( store, router )

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    ssrContext,
    render: h => h( App )
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
