import { modifier } from '../api/location'
import { makePostRequest, makeSimpleRequest } from '../api/index'
import { matchCateogryToId } from '../utilities/helpers'

export default {
  getPage: ({ commit, state }, slug ) => {

    return makePostRequest( modifier.pages + '?slug=' + slug ).then( response => {

      if ( response.length > 0 ) {

        // Get first object in array.
        const page = response[0]

        commit( 'SET_PAGE', { slug, page })
      }
    })
  },
  getPost: ({ commit, state }, slug ) => {

    // Only get data if we don't already have it.
    return makePostRequest( modifier.posts + '?slug=' + slug ).then( response => {

      if ( response.length > 0 ) {

        // Get object in array.
        const post = response[0]

        commit( 'SET_ACTIVE_POST', post.id )

        commit( 'SET_POST', { post })
      }
    })
  },
  getPosts: ({ commit, state }, payload ) => {

    // From payload.
    const type = payload.type
    const count = payload.count

    const catId = matchCateogryToId( state.categories, type )

    // Cat query.
    const categories = catId ? '&categories=' + catId : ''

    // Our total postes per page.
    const perPage = state.postsPerPage

    return makePostRequest( modifier.posts + '/?per_page=' + perPage + categories + '&page=' + count ).then( response => {

      // Response.
      const posts     = response
      const postCount = parseInt( posts[0].totalPosts )

      const ids = posts.map( ( post ) => {
        return post.id
      })

      // Set active type.
      commit( 'SET_ACTIVE_TYPE', type )

      if ( catId ) {
        // Set active category if it exists.
        commit( 'SET_ACTIVE_CAT', catId )
      }

      // Set ids by type.
      commit( 'SET_ARCHIVE', { type, ids, count })

      // Set total number of posts.
      commit( 'SET_POST_COUNT', { type, postCount })

      // Set post data and page location.
      commit( 'SET_POSTS', { posts })

    })
  },
  getMenus: ({ commit, state }) => {

    // No fallback needed, fires only once on app init.
    return makeSimpleRequest( modifier.menus ).then( response => {

      // Set date of that pull.
      commit( 'SET_MENU_PULL_DATE', ( new Date() ).getTime() )

      // Set menu array.
      commit( 'SET_MENUS', response )
    })
  },
  getCategories: ({ commit, state }) => {

    // No fallback needed, fires only once on app init.
    return makeSimpleRequest( modifier.cat ).then( response => {

      // Set category array.
      commit( 'SET_CATEGORIES', response )
    })
  }
}
