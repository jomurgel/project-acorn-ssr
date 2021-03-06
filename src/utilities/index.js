import { CARD_IMAGE } from '@root/webconfig'

/**
 * Get the menu associated with a slug.
 *
 * @export const
 * @param  {array} array array of menus.
 * @param  {string} slug specific menu to search.
 */
export const returnQueriedMenu = ( array, slug ) => {

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
export const setTitle = data => {

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
export const setDescription = data => {

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
export const setFeaturedImage = data => {

  // Get root to make sure we have a featured image.
  let source = data ? data.featuredImage : ''

  // Double check else output our default set in webconfig.js.
  source = source ? source.media.sizes.medium.source_url : CARD_IMAGE

  return source
}

/**
 * Return bool if page has already been pulled.
 *
 * @param {*} obj object full of posts.
 * @param int route current page.
 */
export const getPagePullStatus = ( array, count ) => {

  let posts = array

  // Loop through menu items and grab array where slug = menu location.
  let doesCountExist = posts.some( ( post ) => {
    return post.pageNumber === count
  })

  return doesCountExist
}

/**
 * Finds unique post between two arrays.
 *
 * @export
 * @param {any} array list of posts.
 * @returns unique posts.
 */
export const findUniquePost = array => {

  var posts = array.map( ( postOne ) => {
    return postOne.slug
  })

  return ! posts.some( ( postOne ) => {
    return posts.filter( ( postTwo ) => {
      return postTwo === postOne
    }).length > 1
  })
}

/**
 * Return ID from category slug.
 *
 * @export
 * @param {any} array array of categories
 * @param {any} slug category slug
 */
export const matchCategoryToId = ( array, slug ) => {

  const categoryFilter = array.filter( ( cat ) => {
    const valid = cat.slug === slug

    if ( valid ) {
      return valid // true
    }
  }).map( item => {
    return item.id
  })

  // Return category id string or null.
  return categoryFilter[0] || null
}

/**
 * Return size of object.
 *
 * @param {*} obj object full of posts.
 */
export const objectSize = object => {
  let size = 0
  let key

  for ( key in object ) {
    if ( object.hasOwnProperty( key ) ) size ++
  }
  return size
}

/**
 * Captialize first letter.
 *
 * @export
 * @param {any} string text string
 * @returns capitalized first letter
 */
export const capitalize = string => {
  return string.charAt( 0 ).toUpperCase() + string.slice( 1 )
}
