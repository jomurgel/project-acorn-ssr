import { modifier } from '../api/location'
import { makePostRequest, makeSimpleRequest } from '../api/index'
import { matchCateogryToId, objectSize } from '../utilities/helpers'

export default {
  // Handle page requests.
  getPage: ({ commit, state }, slug ) => {

    // If we don't have a post that matches the slug.
    if ( objectSize( state.pages[slug] ) === 0 ||

      // Or if we do, but the date of pull is more than 24 hours ago.
      ( state.pages[slug] > 0 && ( ( new Date() ).getTime() - state.page[slug].pullDate >= 24 * 60 * 60 * 1000 ) ) ) {

      // Make api request for page by slug.
      return makePostRequest( modifier.pages + '?slug=' + slug ).then( response => {

        // Assume we have a response.
        if ( response.length > 0 ) {

          // Get first object in array.
          const page = response[0]

          // Set page to store, slug as key.
          commit( 'SET_PAGE', { slug, page })
        }
      })
    }
  },
  // Handle single post request.
  getPost: ({ commit, state }, slug ) => {

    // If we have matching posts by slug.
    const hasPost = Object.keys( state.posts ).filter( ( key ) => {
      return state.posts[key].slug === slug
    })

    // Always set active post regardless of whether or not we request.
    commit( 'SET_ACTIVE_POST', parseInt( hasPost[0] ) )

    // Pull if we don't have posts.
    if ( hasPost.length === 0 ||

      // Or if we do, but the date of pull is more than 24 hours ago.
      ( hasPost.length > 0 && ( ( new Date() ).getTime() - state.posts[hasPost[0]].pullDate >= 24 * 60 * 60 * 1000 ) ) ) {

      // Only get data if we don't already have it.
      return makePostRequest( modifier.posts + '?slug=' + slug ).then( response => {

        // Assume we have a response.
        if ( response.length > 0 ) {

          // Get object in array.
          const post = response[0]

          // Set post object to store. Getter handles all else.
          commit( 'SET_POST', { post })
        }
      })
    }
  },
  // Handle Posts (bulk) Requests.
  getPosts: ({ commit, state }, payload ) => {

    // From payload.
    const type = payload.type
    const count = payload.count

    const catId = matchCateogryToId( state.taxonomy.categories, type )

    // Cat query.
    const categories = catId ? '&categories=' + catId : ''

    // Our total postes per page.
    const perPage = state.postsPerPage

    // Set active type.
    commit( 'SET_ACTIVE_TYPE', type )

    if ( catId ) {
      // Set active category if it exists.
      commit( 'SET_ACTIVE_CAT', catId )
    }

    // If our post on the page are empty.
    if ( objectSize( state.archives[type].posts[( count - 1 )] ) === 0 ) {

      // Only get data if we don't already have it.
      return makePostRequest( modifier.posts + '/?per_page=' + perPage + categories + '&page=' + count ).then( response => {

        // Response.
        const posts     = response
        const postCount = parseInt( posts[0].totalPosts )

        // Return post ids to server to archive object.
        const ids = posts.map( ( post ) => {
          return post.id
        })

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

      // Make sure we have valid posts — loop through and return query for posts that are outdated.
      const validPostCheck = state.archives[type].posts[count].filter( ( post ) => {

        // If post was lasted pulled more than 24 hours ago.
        return ( ( new Date() ).getTime() - state.posts[post].pullDate >= 24 * 60 * 60 * 1000 )

      }).map( item => {
        return `include[]=${item}`
      })

      // If our check returned a result, make a new request of just those posts.
      if ( validPostCheck.length > 0 ) {

        // Join query data with & to successfully request API data.
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
  // Get Menus.
  getMenus: ({ commit, state }) => {

    // Pull if we don't have the menu OR if we do.
    if ( state.navigation.menus.length === 0 ||

      // Or if we do, but the date of pull is more than 24 hours ago.
      ( state.navigation.menus.length > 0 && ( new Date() ).getTime() - state.navigation.pullDate >= 24 * 60 * 60 * 1000 ) ) {

      // No fallback needed, fires only once on app init.
      return makeSimpleRequest( modifier.menus ).then( response => {

        // Set date of that pull.
        commit( 'SET_MENU_PULL_DATE', ( new Date() ).getTime() )

        // Set menu array.
        commit( 'SET_MENUS', response )
      })
    }
  },
  // Get Categories.
  getCategories: ({ commit, state }) => {

    // Pull if we don't have the menu OR if we do
    if ( state.taxonomy.categories.length === 0 ||

      // Or if we do, but the date of pull is more than 24 hours ago.
      ( state.taxonomy.categories.length > 0 && ( new Date() ).getTime() - state.taxonomy.pullDate >= 24 * 60 * 60 * 1000 ) ) {

      // No fallback needed, fires only once on app init.
      return makeSimpleRequest( modifier.categ ).then( response => {

        // Set date of that pull.
        commit( 'SET_CATEGORIES_PULL_DATE', ( new Date() ).getTime() )

        // Set category array.
        commit( 'SET_CATEGORIES', response )
      })
    }
  }
}
