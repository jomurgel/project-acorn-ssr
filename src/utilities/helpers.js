import { CARD_IMAGE } from '@root/webconfig'

// Get the menu associated with a slug.
export function returnQueriedMenu( array, slug ) {

  // Setup vars
  let menu         = array
  let menuLocation = slug

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

export function setTitle( data ) {

  // Assuming we have data, return WordPress title, else 404.
  // Helpful for error handling components.
  return data ? data.title : 'Oops! a 404'
}

export function setDescription( data ) {

  // Assuming we have data, return WordPress title, else 404.
  // Helpful for error handling components.
  return data ? data.excerpt.replace( /<(?:.|\n)*?>/gm, '' ).split( /\s+/ ).slice( 0, 15 ).join( ' ' ) + '...' : 'Looks like something\'s gone wrong.'
}

export function setFeaturedImage( data ) {

  // Get root to make sure we have a featured image.
  let source = data ? data.featured_image : ''

  // Double check else output our default set in webconfig.js.
  source = source ? source.media.sizes.medium.source_url : CARD_IMAGE

  return source
}

export function setSinglePost( slug, posts ) {

  const post = posts.filter( function( e ) {
    return e.slug === slug
  })

  return post[0]
}
