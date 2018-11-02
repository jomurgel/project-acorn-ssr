import { modifier } from '../api/location'
import { makeSimpleRequest, filterPostData } from '../api/index'
import * as utility from '../utilities'

import { HTTP } from '../api/baseurl'

// Check if we're in dev mode.
const isDevelopment = process.env.NODE_ENV !== 'production'

export default {
  // Handle page requests.
  getPage: ({ commit, state }, slug ) => {

    const url = modifier.page

    // If we have matching posts by slug.
    const hasPost = Object.keys( state.posts ).filter( ( key ) => {
      return state.posts[key].slug === slug
    })

    // Pull if we don't have posts.
    if ( hasPost.length === 0 ||

      // Or if we do, but the date of pull is more than 24 hours ago.
      ( hasPost.length > 0 && ( ( new Date() ).getTime() - state.posts[hasPost[0]].pullDate >= 24 * 60 * 60 * 1000 || isDevelopment ) ) ) {

      // Only get data if we don't already have it.
      return new Promise( ( resolve, reject ) => {

        HTTP.get( `${url}?slug=${slug}` ).then( ( response ) => {

          if ( response.length === 0 ) {

            // Reset active post.
            commit( 'SET_ACTIVE_POST', '' )
          }

          if ( response.status === 200 && response.data.length > 0 ) {

            // Get object in array.
            const post = filterPostData( response )[0]

            // Always set active post regardless of whether or not we request.
            commit( 'SET_ACTIVE_POST', post.id )

            // Set post object to store. Getter handles all else.
            commit( 'SET_POST', { post })

            resolve( post )
          } else {
            reject( response )
          }
        })
      })
    }
    // Always set active post regardless of whether or not we request.
    commit( 'SET_ACTIVE_POST', parseInt( hasPost[0] ) )
  },
  // Handle single post request.
  getPost: ({ commit, state }, payload ) => {

    // From payload
    const type = payload.type
    const slug = payload.slug

    // Generate url from location.
    const url = modifier[type]

    // If we have matching posts by slug.
    const hasPost = Object.keys( state.posts ).filter( ( key ) => {
      return state.posts[key].slug === slug
    })

    // Pull if we don't have posts.
    if ( hasPost.length === 0 ||

      // Or if we do, but the date of pull is more than 24 hours ago.
      ( hasPost.length > 0 && ( ( new Date() ).getTime() - state.posts[hasPost[0]].pullDate >= 24 * 60 * 60 * 1000 || isDevelopment ) ) ) {

      // Only get data if we don't already have it.
      return new Promise( ( resolve, reject ) => {

        HTTP.get( `${url}?slug=${slug}` ).then( ( response ) => {

          if ( response.length === 0 ) {

            // Reset active post.
            commit( 'SET_ACTIVE_POST', '' )
          }

          if ( response.status === 200 && response.data.length > 0 ) {

            // Get object in array.
            const post = filterPostData( response )[0]

            // Always set active post regardless of whether or not we request.
            commit( 'SET_ACTIVE_POST', post.id )

            // Set post object to store. Getter handles all else.
            commit( 'SET_POST', { post })

            resolve( post )
          } else {
            reject( response )
          }
        })
      })
    }
    // Always set active post regardless of whether or not we request.
    commit( 'SET_ACTIVE_POST', parseInt( hasPost[0] ) )
  },
  // Handle Posts (bulk) Requests.
  getPosts: ({ commit, state }, payload ) => {

    // Generate url from location.
    const url = modifier.post

    // From payload.
    const type  = payload.type
    const count = payload.count

    const catId = utility.matchCategoryToId( state.taxonomy.categories, type )

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
    if ( utility.objectSize( state.archives[type].posts[( count - 1 )] ) === 0 || isDevelopment ) {

      // Only get data if we don't already have it.
      return new Promise( ( resolve, reject ) => {

        HTTP.get( `${url}/?per_page=${perPage}${categories}&page=${count}` ).then( ( response ) => {

          if ( response.status === 200 && response.data.length > 0 ) {

            // Response.
            const posts = filterPostData( response )

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

            resolve( posts )
          } else {
            reject( response )
          }
        })
      })
    }

    // If we have posts, let's check each one to see which, if any, we need to pull again.
    if ( utility.objectSize( state.archives[type].posts[count] ) > 0 ) {

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
        return new Promise( ( resolve, reject ) => {

          HTTP.get( `${url}?${postIds}` ).then( ( response ) => {

            if ( response.status === 200 && response.data.length > 0 ) {

              // Get object in array.
              const posts = filterPostData( response )

              // Set post data and page location.
              commit( 'SET_POSTS', { posts })

              resolve( posts )
            } else {
              reject( response )
            }
          })
        })
      }
    }
  },
  // Get Menus.
  getMenus: ({ commit, state }) => {

    // Pull if we don't have the menu OR if we do.
    if ( state.navigation.menus.length === 0 ||

      // Or if we do, but the date of pull is more than 24 hours ago.
      ( state.navigation.menus.length > 0 && ( ( new Date() ).getTime() - state.navigation.pullDate >= 24 * 60 * 60 * 1000 || isDevelopment ) ) ) {

      // No fallback needed, fires only once on app init.
      return makeSimpleRequest( modifier.menus ).then( response => {

        // Set date of that pull.
        commit( 'SET_MENU_PULL_DATE', ( new Date() ).getTime() )

        // Set menu array.
        commit( 'SET_MENUS', response )
      })

      // // No fallback needed, fires only once on app init.
      // return new Promise( ( resolve, reject ) => {

      //   HTTP.get( `${modifier.menus}` ).then( response => {

      //     console.log( response )

      //     if ( response.status === 200 && response.data.length > 0 ) {

      //       // Set date of that pull.
      //       commit( 'SET_MENU_PULL_DATE', ( new Date() ).getTime() )

      //       // Set menu array.
      //       commit( 'SET_MENUS', response )

      //       resolve( response )
      //     } else {
      //       reject( response )
      //     }
      //   })
      // })
    }
  },
  // Get Categories.
  getCategories: ({ commit, state }) => {

    // Pull if we don't have the menu OR if we do
    if ( state.taxonomy.categories.length === 0 ||

      // Or if we do, but the date of pull is more than 24 hours ago.
      ( state.taxonomy.categories.length > 0 && ( ( new Date() ).getTime() - state.taxonomy.pullDate >= 24 * 60 * 60 * 1000 || isDevelopment ) ) ) {

      // No fallback needed, fires only once on app init.
      return makeSimpleRequest( modifier.category ).then( response => {

        // Set date of that pull.
        commit( 'SET_CATEGORIES_PULL_DATE', ( new Date() ).getTime() )

        // Set category array.
        commit( 'SET_CATEGORIES', response )
      })
    }
  }
}
