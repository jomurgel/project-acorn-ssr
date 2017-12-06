import Vue from 'vue'
import Router from 'vue-router'

Vue.use( Router )

const createView = relativePath => () => import( '@src/views/' + relativePath )

export default () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: createView( 'Home' )
    },
    {
      path: '/blog',
      component: createView( 'Posts' )
    },
    {
      path: '/blog/:slug',
      component: createView( 'Single' )
    },
    {
      path: '/:slug',
      component: createView( 'Page' )
    },
    {
      path: '*',
      component: createView( '404' )
    }
  ]
})
