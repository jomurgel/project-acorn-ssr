import Vue from 'vue'
import Router from 'vue-router'

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
    name: 'blog',
    component: createView( 'Blog' )
  },
  {
    path: '/blog/:slug',
    name: 'single',
    component: createView( 'Single' )
  },
  {
    path: '/:slug',
    name: 'page',
    component: createView( 'Page' )
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
