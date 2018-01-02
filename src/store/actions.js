import http from 'axios'
import { BASE_URL } from '@root/siteconfig'
import { modifier } from '../utilities/helpers'

http.defaults.baseURL = BASE_URL

export default {
  getPosts: ({ commit, state }) => {
    return http.get( modifier.posts ).then( ( response ) => {
      if ( response.data.length !== 0 ) {
        commit( 'setPosts', response.data )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  },
  getPages: ({ commit, state }) => {
    return http.get( modifier.pages ).then( ( response ) => {
      if ( response.data.length !== 0 ) {
        commit( 'setPages', response.data )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  },
  getMenus: ({ commit, state }) => {
    return http.get( modifier.menus ).then( ( response ) => {
      if ( response.data.length !== 0 ) {
        commit( 'setMenus', response.data )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  }
}
