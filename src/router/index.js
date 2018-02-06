import Vue from 'vue'
import Router from 'vue-router'

Vue.use( Router )

const createView = relativePath => () => import( '@src/views/' + relativePath )

// let apiTest = []

const routes = [
  {
    path: '/',
    name: 'root',
    component: createView( 'Custom' )
  },
  {
    path: '/blog',
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

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
