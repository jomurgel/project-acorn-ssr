import { HTTP } from '../api/baseurl'
import { modifier } from '../api/location'

export default {
  getPage: ({ commit, state }, slug ) => {
    return state.pages[slug] ||
    // Only get data if we don't already have it.
    HTTP.get( modifier.pages + '/?slug=' + slug ).then( ( response ) => {
      if ( response.status === 200 && response.data.length > 0 ) {

        // Set placeholder array.
        const pageArray = []

        // Remove unecessary data from object.
        response.data.map( ( item ) => {
          const filtered = {
            id: item.id,
            title: item.title.rendered,
            excerpt: item.excerpt.rendered,
            slug: item.slug,
            content: item.content.rendered,
            featured_image: item.featured_image
          }

          // Return new array object.
          return pageArray.push( filtered )
        })

        // Get object in array.
        const page = pageArray[0]
        // Grab object slug.
        const slug = page.slug

        commit( 'setPage', { slug, page })
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  },
  getPosts: ({ commit, state }) => {
    // Only get data if we don't already have it.
    if ( state.posts.length === 0 ) {
      return HTTP.get( modifier.posts ).then( ( response ) => {
        if ( response.status === 200 && response.data.length > 0 ) {
          const array = []
          response.data.map( ( item ) => {
            const filtered = {
              id: item.id,
              title: item.title.rendered,
              excerpt: item.excerpt.rendered,
              slug: item.slug,
              content: item.content.rendered,
              featured_image: item.featured_image
            }
            return array.push( filtered )
          })
          commit( 'setPosts', array )
        }
      }).catch( ( error ) => {
        console.log( error )
      })
    }
  },
  getMenus: ({ commit, state }) => {
    return HTTP.get( modifier.menus ).then( ( response ) => {
      if ( response.status === 200 ) {
        commit( 'setMenus', response.data )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  }
}
