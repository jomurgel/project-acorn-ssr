import Vue from 'vue'
import Router from 'vue-router'
import createStore from '../store'

Vue.use( Router )

const createView = relativePath => () => import( '@src/views/' + relativePath )

const routes = [
  {
    path: '/',
    name: 'root',
    component: createView( 'Custom' )
  },
  {
    path: '/blog/:page(\\d+)?',
    name: 'archive',
    component: createView( 'Archive' )
  },
  {
    path: '/blog/:slug',
    name: 'single',
    component: createView( 'Single' ),
    beforeEnter: ( to, from, next ) => {
      // Handler for refresh or if we land and redirect to single component.
      if ( to.params.slug === '404' ) {
        next({ name: '404', params: { slug: '404' } })
      }
      next()
    }
  },
  {
    path: '/category/:type/:page(\\d+)?',
    name: 'category',
    component: createView( 'Archive' ),
    beforeEnter: ( to, from, next ) => {
      // Access store and confirm that we have an archive before proceeding.
      const store = createStore()
      if ( ! store.state.archives.hasOwnProperty( to.params.type ) ) {
        next({ name: '404', params: { slug: '404' } })
      }
      next()
    }
  },
  {
    path: '/:slug',
    name: 'page',
    component: createView( 'Page' ),
    beforeEnter: ( to, from, next ) => {
      // Handler for refresh or if we land and redirect to page component.
      if ( to.params.slug === '404' ) {
        next({ name: '404', params: { slug: '404' } })
      }
      next()
    }
  },
  {
    // Catch-all, though the 404 component is
    // called in templates to prevent issues.
    path: '/404',
    name: '404',
    component: createView( '404' )
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default () => new Router({
  mode: 'history',
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes
})
