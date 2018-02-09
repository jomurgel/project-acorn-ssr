import { HTTP } from '../api/baseurl'
import { modifier } from '../api/location'
import { objectSize } from '../utilities/helpers'
import { makePostRequest } from '../api/index'

export default {
  getPage: ({ commit, state }, slug ) => {

    return state.pages[slug] ||
      makePostRequest( modifier.pages + '/?slug=' + slug ).then( response => {

        // Get object in array.
        const page = response[0]

        commit( 'setPage', { slug, page })

      })
  },
  getPost: ({ commit, state }, slug ) => {

    // Only get data if we don't already have it.
    return state.posts[slug] ||
      makePostRequest( modifier.posts + '/?slug=' + slug ).then( response => {

        // Get object in array.
        const posts = response

        commit( 'setPosts', { posts })

      })
  },
  getPosts: ({ commit, state }) => {

    // Get post object length.
    const postsLength = objectSize( state.posts )
    const havePosts   = state.blogPull === true && state.blogPullDate - state.date < 24 * 60 * 60 * 1000

    if ( postsLength === 0 || ! havePosts ) {

      makePostRequest( modifier.posts ).then( response => {

        const posts = response

        // Set blog pull status to true.
        commit( 'setBlogPullStatus', true )

        // Set date of that pull.
        commit( 'setBlogPullTimeStamp', ( new Date() ).getTime() )
        commit( 'setPosts', { posts })

      })
    }

    // Return our store.
    return state.posts

  },
  getMenus: ({ commit, state }) => {
    return HTTP.get( modifier.menus ).then( ( response ) => {
      if ( response.status === 200 && response.data.length > 0 ) {
        commit( 'setMenus', response.data )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  }
}
