import { modifier } from '../api/location'
import { makePostRequest, makeSimpleRequest } from '../api/index'
import { matchCateogryToId, objectSize } from '../utilities/helpers'

export default {
  getPage: ({ commit, state }, slug ) => {

    console.log( slug )

    if ( objectSize( state.pages[slug] ) === 0 || ( state.pages[slug] > 0 && ( ( new Date() ).getTime() - state.page[slug].pullDate >= 24 * 60 * 60 * 1000 ) ) ) {

      return makePostRequest( modifier.pages + '?slug=' + slug ).then( response => {

        if ( response.length > 0 ) {

          // Get first object in array.
          const page = response[0]

          commit( 'SET_PAGE', { slug, page })
        }
      })
    }
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

    const catId = matchCateogryToId( state.taxonomy.categories, type )

    // Cat query.
    const categories = catId ? '&categories=' + catId : ''

    // Our total postes per page.
    const perPage = state.postsPerPage

    // If our post on the page are empty.
    if ( objectSize( state.archives[type].posts[( count - 1 )] ) === 0 ) {

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
    }

    // If we have posts, let's check each one to see which, if any, we need to pull again.
    if ( objectSize( state.archives[type].posts[count] ) > 0 ) {
      const validPostCheck = state.archives[type].posts[count].filter( ( post ) => {

        // If post was lasted pulled more than 24 hours ago.
        return ( ( new Date() ).getTime() - state.posts[post].pullDate >= 24 * 60 * 60 * 1000 )

      }).map( item => {
        return `include[]=${item}`
      })

      // If our check returned a result, make a new request of just those posts.
      if ( validPostCheck.length > 0 ) {

        const postIds = validPostCheck.join( '&' )

        // Only get data if we don't already have it.
        return makePostRequest( modifier.posts + '?' + postIds ).then( response => {

          // Get object in array.
          const posts = response

          // Set post data and page location.
          commit( 'SET_POSTS', { posts })
        })
      }
    }
  },
  getMenus: ({ commit, state }) => {

    // Pull if we don't have the menu OR if we do, but it's older than 24 hours.
    if ( state.navigation.menus.length === 0 || ( state.navigation.menus.length > 0 && ( new Date() ).getTime() - state.navigation.pullDate >= 24 * 60 * 60 * 1000 ) ) {

      // No fallback needed, fires only once on app init.
      return makeSimpleRequest( modifier.menus ).then( response => {

        // Set date of that pull.
        commit( 'SET_MENU_PULL_DATE', ( new Date() ).getTime() )

        // Set menu array.
        commit( 'SET_MENUS', response )
      })
    }
  },
  getCategories: ({ commit, state }) => {

    // Pull if we don't have the menu OR if we do, but it's older than 24 hours.
    if ( state.taxonomy.categories.length === 0 || ( state.taxonomy.categories.length > 0 && ( new Date() ).getTime() - state.taxonomy.pullDate >= 24 * 60 * 60 * 1000 ) ) {

      // No fallback needed, fires only once on app init.
      return makeSimpleRequest( modifier.cat ).then( response => {

        // Set date of that pull.
        commit( 'SET_CATEGORIES_PULL_DATE', ( new Date() ).getTime() )

        // Set category array.
        commit( 'SET_CATEGORIES', response )
      })
    }
  }
}
