import Vue from 'vue'
import Router from 'vue-router'
import { HTTP } from '../utilities/baseurl'
import { modifier } from '../utilities/helpers'

Vue.use( Router )

const createView = relativePath => () => import( '@src/views/' + relativePath )

const routes = [
  {
    path: '/',
    component: createView( 'Custom' )
  },
  {
    path: '/blog',
    component: createView( 'Blog' )
  },
  {
    path: '/blog/:slug',
    component: createView( 'Single' ),
    beforeEnter: ( to, from, next ) => {
      HTTP.get( modifier.posts ).then( ( response ) => {
        const postArray = response.data
        const test = postArray.map( ( object ) => { return object.slug })

        if ( test.indexOf( to.params.slug ) === -1 ) {
          next({ name: '404' })
        }
        next()
      })
    }
  },
  {
    path: '/:slug',
    component: createView( 'Single' ),
    beforeEnter: ( to, from, next ) => {
      HTTP.get( modifier.pages ).then( ( response ) => {
        const pageArray = response.data
        const test = pageArray.map( ( object ) => { return object.slug })

        if ( test.indexOf( to.params.slug ) === -1 ) {
          next({ name: '404' })
        }
        next()
      })
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
  scrollBehavior: () => ({ y: 0 }),
  routes
})
