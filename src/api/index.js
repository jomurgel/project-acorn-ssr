import { HTTP } from '../api/baseurl'
import router from '../router'

// Return promise from post data.
// Works with posts (all) and individual pages or posts.
export function makePostRequest( url ) {

  return HTTP.get( url ).then( ( response ) => {

    // 404 if we have a good response, but no data.
    // OR no response.
    // OR anything other than a 200 response.
    if ( ( response.status === 200 && response.data.length === 0 ) || response.length === 0 || response.status !== 200 ) {

      // Push to 404 component.
      router.push({ name: '404', params: { slug: '404' } })
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
        pageNumber: 0,
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
