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
    path: '/posts/:page(\\d+)?',
    name: 'posts',
    component: createView( 'Posts' )
  },
  {
    path: '/category/:type/:page(\\d+)?',
    name: 'category',
    component: createView( 'Category' ),
    beforeEnter: ( to, from, next ) => {
      // Access store and confirm that we have an archive before proceeding.
      const store = createStore()

      // Handler for refresh or if we land and redirect to single component.
      if ( ! store.state.archives.hasOwnProperty( to.params.type ) || to.params.slug === '404' ) {
        next({ name: '404', params: { error: '404' } })
      }
      next()
    }
  },
  {
    path: '/:post_type/:slug',
    name: 'single',
    component: createView( 'Single' ),
    beforeEnter: ( to, from, next ) => {
      // Handler for refresh or if we land and redirect to single component.
      if ( to.params.slug === '404' ) {
        next({ name: '404', params: { error: '404' } })
      }
      next()
    }
  },
  {
    path: '/:slug',
    name: 'page',
    component: createView( 'Page' ),
    beforeEnter: ( to, from, next ) => {
      // Handler for refresh or if we land and redirect to single component.
      if ( to.params.slug === '404' ) {
        next({ name: '404', params: { error: '404' } })
      }
      next()
    }
  },
  {
    // Catch-all, though the 404 component is
    // called in templates to prevent issues.
    path: '/:error',
    name: '404',
    component: createView( '404' )
  }
]

export default () => new Router({
  mode: 'history',
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes
})
