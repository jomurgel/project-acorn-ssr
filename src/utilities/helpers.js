// Get the menu associated with a slug.
export function returnQueriedMenu( array, slug ) {

  // Setup vars
  let menu         = array
  let menuLocation = slug

  // Return if empty.
  if ( ! menu ) {
    return
  }

  // Loop through menu items and grab array where slug = menu location.
  const newMenu = menu.filter( element => element.slug === menuLocation )

  // Return array to local storage.
  return newMenu[0]
}

export const modifier = {
  posts: 'wp/v2/posts',
  menus: 'wp-api-menus/v2/menus',
  pages: 'wp/v2/pages'
}
