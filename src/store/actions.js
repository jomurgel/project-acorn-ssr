import { HTTP } from '../api/baseurl'
import { POSTS_PER_PAGE } from '@root/webconfig'
import { modifier } from '../api/location'
import { getPagePullStatus } from '../utilities/helpers'
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
    return state.posts.filter( post => post.slug === slug ) ||
      makePostRequest( modifier.posts + '/?slug=' + slug ).then( response => {

        // Get object in array.
        const posts = response

        commit( 'setPosts', [ posts ] )

      })
  },
  getPosts: ({ commit, state }, count ) => {

    // Make int.
    const pageCount = parseInt( count )

    // Get post object length.
    const postsLength = state.posts.length

    // Check if we've already pulled our page.
    const hasPage = getPagePullStatus( state.posts, pageCount )

    // Check if we have un-expired posts.
    const havePosts = state.blogPull === true && state.blogPullDate - state.date < 24 * 60 * 60 * 1000

    // Our total postes per page.
    const perPage = POSTS_PER_PAGE

    if ( ( hasPage === false || postsLength === 0 ) && ! havePosts ) {

      makePostRequest( modifier.posts + '/?per_page=' + perPage + '&page=' + count ).then( response => {

        const posts          = response
        const totalPostCount = parseInt( posts[0].totalPosts )

        // Set total number of posts.
        commit( 'setPostCount', totalPostCount )

        // Set blog pull status to true.
        commit( 'setBlogPullStatus', true )

        // Set date of that pull.
        commit( 'setBlogPullTimeStamp', ( new Date() ).getTime() )

        // Set post data and page location.
        commit( 'setPosts', [ posts, count ] )

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
