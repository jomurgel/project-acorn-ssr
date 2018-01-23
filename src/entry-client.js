import Vue from 'vue'
import { createApp } from './app'
import sprite from '@assets/sprite.svg'
import ProgressBar from './views/components/ProgressBar'

// inject svg sprite
const spriteEl = document.createElement( 'div' )
spriteEl.style.display = 'none'
spriteEl.innerHTML = sprite
document.body.appendChild( spriteEl )

const isProduction = process.env.NODE_ENV === 'production'

// global progress bar
const bar = Vue.prototype.$bar = new Vue( ProgressBar ).$mount()
document.body.appendChild( bar.$el )

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate( to, from, next ) {
    const { asyncData } = this.$options
    if ( asyncData ) {
      asyncData({
        store: this.$store,
        route: to
      }).then( next ).catch( next )
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if ( window.__INITIAL_STATE__ ) {
  store.replaceState( window.__INITIAL_STATE__ )
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady( () => {

  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve( ( to, from, next ) => {

    const matched = router.getMatchedComponents( to )
    const prevMatched = router.getMatchedComponents( from )

    let diffed = false

    const activated = matched.filter( ( c, i ) => {
      return diffed || ( diffed = ( prevMatched[i] !== c ) )
    })

    bar.start()

    const asyncDataHooks = activated.map( c => c.asyncData ).filter( _ => _ )

    if ( ! asyncDataHooks.length ) {
      bar.finish()
      return next()
    }

    Promise.all( asyncDataHooks.map( hook => hook({ store, route: to }) ) )
      .then( () => {
        bar.finish()
        next()
      })
      .catch( next )
  })

  // actually mount to DOM
  app.$mount( '#app' )
})

// service worker
if ( isProduction && 'serviceWorker' in navigator ) {
  navigator.serviceWorker.register( '../dist/service-worker.js' )
} else {
  navigator.serviceWorker.getRegistrations()
    .then( function( registrations ) {

      console.log( 'Unregistering service workers for development' )

      for ( let registration of registrations ) {
        registration.unregister()
      }
    })
}
