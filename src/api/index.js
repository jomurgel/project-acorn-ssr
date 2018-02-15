import { HTTP } from '../api/baseurl'
import router from '../router'

// Return promise from post data.
// Works with posts (all) and individual pages or posts.
export function makePostRequest( url ) {

  return HTTP.get( url ).then( ( response ) => {

    if ( response.status !== 200 || response.data.length === 0 ) {

      // If we don't recieve data push to 404 post.
      router.push({ name: '404' })
    }

    const totalPostCount = response.headers['x-wp-total']

    // Set placeholder array & Remove unecessary data from object.
    const postArray = response.data.map( ( post ) => {
      const filtered = {
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        featuredImage: post.featured_image,
        id: post.id,
        modifiedDate: post.modified,
        pageNumber: null,
        slug: post.slug,
        title: post.title.rendered,
        totalPosts: totalPostCount
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
