import { HTTP } from '../utilities/baseurl'
import { modifier } from '../utilities/helpers'

export default {
  getPages: ({ commit, state }) => {
    return HTTP.get( modifier.pages ).then( ( response ) => {
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
        commit( 'setPages', array )
      } else {
        // console.log( response )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  },
  getPosts: ({ commit, state }) => {
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
      } else {
        // console.log( response )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
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
