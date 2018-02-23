import { modifier } from '../api/location'
import { getPagePullStatus } from '../utilities/helpers'
import { makePostRequest, makeMenuRequest } from '../api/index'

export default {
  getPage: ({ commit, state }, slug ) => {

    return state.pages[slug] ||
      makePostRequest( modifier.pages + '?slug=' + slug ).then( response => {

        if ( response.length > 0 ) {

          // Get object in array.
          const page = response[0]

          commit( 'setPage', { slug, page })
        }
      })
  },
  getPost: ({ commit, state }, slug ) => {

    // Find post by slug in posts state array.
    const currentPost = state.posts.filter( post => { return post.slug === slug })[0]

    if ( currentPost === undefined ) {

      // Only get data if we don't already have it.
      return makePostRequest( modifier.posts + '?slug=' + slug ).then( response => {

        if ( response.length > 0 ) {

          // Get object in array.
          const post = response[0]

          commit( 'setPost', { slug, post })
        }
      })
    }

    return currentPost
  },
  getPosts: ({ commit, state }, count ) => {

    // Make int.
    const pageCount = parseInt( count )

    // Get post object length.
    const postsLength = state.posts.length

    // Check if we've already pulled our page.
    const hasPage = getPagePullStatus( state.posts, pageCount )

    // Check if we have un-expired posts. More than 24 hours old.
    const havePosts = state.blogPull === true && ( new Date() ).getTime() - state.blogPullDate >= 24 * 60 * 60 * 1000

    // Our total postes per page.
    const perPage = state.postsPerPage

    if ( ( hasPage === false || postsLength === 0 ) && ! havePosts ) {

      return makePostRequest( modifier.posts + '/?per_page=' + perPage + '&page=' + count ).then( response => {

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

    // Let's check to see if the
    // menu modified date is more than 10 min old.
    let hasBeenUpdated = true

    // Set check if we have posts.
    if ( state.menus.length > 0 ) {
      hasBeenUpdated = ( new Date() ).getTime() - state.menuPullTime >= 10 * 60 * 1000
    }

    // If we have no menus OR we have menus and they're out of date.
    if ( state.menus.length === 0 || hasBeenUpdated === true ) {

      // No fallback needed, fires only once on app init.
      return makeMenuRequest( modifier.menus ).then( response => {

        // Set date of that pull.
        commit( 'setMenuPullTimeStamp', ( new Date() ).getTime() )

        // Set menu array.
        commit( 'setMenus', response )
      })
    }

    return state.menus
  }
}
