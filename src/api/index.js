import { HTTP } from '../api/baseurl'
import createRouter from '../router'

// Create router.
const router = createRouter()

/**
 * Return promise from post data.
 * Works with posts (all) and individual pages or posts.
 *
 * @export
 * @param {any} url rest api url
 * @returns array
 */
export function makePostRequest( url ) {

  return HTTP.get( url ).then( ( response ) => {

    // 404 if we have a good response, but no data.
    // OR no response.
    // OR anything other than a 200 response.
    if ( ( response.status === 200 && response.data.length === 0 ) || response.status !== 200 ) {

      // Push to 404 component.
      router.push({ name: '404', params: { error: '404' } })

      return []
    }

    const totalPostCount = response.headers['x-wp-total']

    // Set placeholder array & Remove unecessary data from object.
    const postArray = response.data.map( ( post ) => {
      const filtered = {
        pullDate: ( new Date() ).getTime(),
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        featuredImage: post.featured_image,
        id: post.id,
        modifiedDate: post.modified,
        slug: post.slug,
        title: post.title.rendered,
        totalPosts: totalPostCount,
        type: post.type
      }

      // Return new array object.
      return filtered
    })

    // Get object in array.
    return postArray

  }).catch( ( error ) => {
    console.log( error )
  })
}

/**
 * Return promise from ulr
 *
 * @export
 * @param {any} url rest api url
 * @returns array
 */
export function makeSimpleRequest( url ) {

  return HTTP.get( url ).then( ( response ) => {

    // Return array.
    return response.data

  }).catch( ( error ) => {
    console.log( error )
  })
}
