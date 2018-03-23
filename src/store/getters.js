export default {
  // set active ids for use in pagination.
  activeIds: ( state ) => {
    const { active, archives } = state

    if ( ! active.archive ) {
      return ''
    }

    const page  = Number( state.route.params.page ) || 1
    const count = page - 1

    return archives[active.archive].posts[count]
  },
  // items that should be currently displayed.
  // this Array may not be fully fetched.
  activePosts: ( state, getters ) => {
    if ( getters.activeIds ) {
      return getters.activeIds.map( id => {
        return state.posts[id]
      })
    }
  },
  // Set single post by id.
  singlePost: ( state ) => {
    return state.posts[state.active.post]
  }
}
