import { findUniquePost } from '@src/utilities/helpers'

export default {
  pages: ( state ) => {
    return state.pages
  },
  posts: ( state ) => {

    let unique = findUniquePost( state.posts )

    let newPostsArray = state.posts.forEach( ( post, index ) => {

      if ( post && post['pageNumber'] === 0 && unique === false ) {
        state.posts.splice( index, 1 )
      }
    })

    return newPostsArray
  },
  activePosts: ( state ) => {

    const page = parseInt( state.route.params.page ) || 1

    let activePosts = state.posts.filter( e => {
      return e.pageNumber === page
    })

    return activePosts
  },
  singlePost: ( state ) => {

    const post = state.route.params.slug

    let singlePost = state.posts.filter( e => {
      return e.slug === post
    })

    return singlePost[0]
  }
}
