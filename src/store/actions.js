import http from 'axios'
import { BASE_URL } from '@root/siteconfig'
import { modifier } from '../utilities/helpers'

http.defaults.baseURL = BASE_URL

export default {
  getPosts: ({ commit, state }) => {
    return http.get( modifier.posts ).then( ( response ) => {
      if ( response.statusText === 'OK' ) {
        commit( 'setPosts', response.data )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  },
  getMenus: ({ commit, state }) => {
    return http.get( modifier.menus ).then( ( response ) => {
      if ( response.statusText === 'OK' ) {
        commit( 'setMenus', response.data )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  }
}
