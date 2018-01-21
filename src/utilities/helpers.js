import { CARD_IMAGE } from '@root/webconfig'

/**
 * Get the menu associated with a slug.
 *
 * @export function
 * @param  {array} array array of menus.
 * @param  {string} slug specific menu to search.
 */
export function returnQueriedMenu( array, slug ) {

  // Setup vars
  let menu         = array
  let menuLocation = slug

  // Loop through menu items and grab array where slug = menu location.
  const newMenu = menu.filter( element => element.slug === menuLocation )

  // Return array to local storage.
  return newMenu[0]
}

/**
 * Return title for Single posts/pages.
 *
 * @export  function
 * @param   {object} data post object.
 * @returns {string} title or empty string.
 */
export function setTitle( data ) {

  // Assuming we have data, return WordPress title.
  // Helpful for error handling components.
  return data ? data.title : ''
}

/**
 * Return description for Single post/pages.
 *
 * @export  function
 * @param   {object} data post object.
 * @returns {string} description or empty string.
 */
export function setDescription( data ) {

  // Assuming we have data, return WordPress title.
  // Helpful for error handling components.
  return data ? data.excerpt.replace( /<(?:.|\n)*?>/gm, '' ).split( /\s+/ ).slice( 0, 15 ).join( ' ' ) + '...' : ''
}

/**
 * Return featured image for Single post/pages.
 *
 * @export  function
 * @param   {object} data post object.
 * @returns {string} featured image url or default config image url.
 */
export function setFeaturedImage( data ) {

  // Get root to make sure we have a featured image.
  let source = data ? data.featured_image : ''

  // Double check else output our default set in webconfig.js.
  source = source ? source.media.sizes.medium.source_url : CARD_IMAGE

  return source
}

/**
 * Return single post object.
 *
 * @export  function
 * @param   {array} posts array of posts or pages.
 * @param   {string} data post object.
 * @returns {string} description or empty string.
 */
export function setSinglePost( slug, posts ) {

  const post = posts.filter( function( e ) {
    return e.slug === slug
  })

  return post[0]
}
