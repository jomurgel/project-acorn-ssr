import { HTTP } from '../api/baseurl'
import router from '../router'
import { modifier } from '../api/location'
import { ObjectSize } from '../utilities/helpers'

export default {
  getPage: ({ commit, state }, slug ) => {

    // Only get data if we don't already have it.
    return state.pages[slug] ||
    HTTP.get( modifier.pages + '/?slug=' + slug ).then( ( response ) => {
      if ( response.status === 200 && response.data.length > 0 ) {

        // Set placeholder array.
        const pageArray = []

        // Remove unecessary data from object.
        response.data.map( ( page ) => {
          const filtered = {
            content: page.content.rendered,
            excerpt: page.excerpt.rendered,
            featuredImage: page.featured_image,
            id: page.id,
            modifiedDate: page.modified,
            slug: page.slug,
            title: page.title.rendered
          }

          // Return new array object.
          return pageArray.push( filtered )
        })

        // Get object in array.
        const page = pageArray[0]
        // Grab object slug.
        const slug = page.slug

        commit( 'setPage', { slug, page })
      } else {
        // If we don't recieve data push to 404 page.
        router.push({ name: '404' })
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  },
  getPost: ({ commit, state }, slug ) => {

    // Only get data if we don't already have it.
    return state.posts[slug] ||
    HTTP.get( modifier.posts + '/?slug=' + slug ).then( ( response ) => {
      if ( response.status === 200 && response.data.length > 0 ) {

        // Set placeholder array.
        const postArray = []

        // Remove unecessary data from object.
        response.data.map( ( post ) => {
          const filtered = {
            content: post.content.rendered,
            excerpt: post.excerpt.rendered,
            featuredImage: post.featured_image,
            id: post.id,
            modifiedDate: post.modified,
            slug: post.slug,
            title: post.title.rendered
          }

          // Return new array object.
          return postArray.push( filtered )
        })

        // Get object in array.
        const posts = postArray

        commit( 'setPosts', { posts })
      } else {
        // If we don't recieve data push to 404 post.
        router.push({ name: '404' })
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  },
  getPosts: ({ commit, state }) => {

    // Get post object length.
    const postLength = ObjectSize( state.posts )

    // Empty array of exclusions.
    const arrayExclusion = []

    // If we have any posts.
    if ( postLength > 0 ) {

      console.log( state.date, state.blogPullDate )

      // If we've already pulled our posts and our pull date is within the last 24 hours, return state.
      if ( state.blogPull === true && state.blogPullDate - state.date < 24 * 60 * 60 * 1000 ) {

        // Return our cache.
        return state.posts

      } else {

        // Get our post object.
        const postObject = state.posts

        // Loop through them and get ids for those that are older than 24hours.
        Object.keys( postObject ).forEach( function( key ) {

          let postID       = postObject[key].id
          let now          = state.date
          let modDate      = postObject[key].modifiedDate
          let modifiedDate = ( new Date( modDate ) ).getTime()

          // If our modified date is less than 24hours old push to array.
          if ( now - modifiedDate < 24 * 60 * 60 * 1000 ) {
            arrayExclusion.push( postID )
          }

        })

        // Return a new comma-separated string else empty string.
        const newArrayExclusion = arrayExclusion.length > 0 ? arrayExclusion.join( ',' ) : ''

        // Then, let's make a request for all posts except for the ones
        // we already have that aren't expired.
        return HTTP.get( modifier.posts + '?exclude=' + newArrayExclusion ).then( ( response ) => {
          if ( response.status === 200 && response.data.length > 0 ) {

            // Set blog pull status to true.
            commit( 'setBlogPullStatus', true )

            // Set date of that pull.
            commit( 'setBlogPullTimeStamp', ( new Date() ).getTime() )

            // Set placeholder array.
            const postArray = []

            // Remove unecessary data from object.
            response.data.map( ( post ) => {
              const filtered = {
                content: post.content.rendered,
                excerpt: post.excerpt.rendered,
                featuredImage: post.featured_image,
                id: post.id,
                modifiedDate: post.modified,
                slug: post.slug,
                title: post.title.rendered
              }

              // Return new array object.
              return postArray.push( filtered )
            })

            // Get object in array.
            const posts = postArray

            commit( 'setPosts', { posts })
          } else {
            // If we don't recieve data push to 404 post.
            router.push({ name: '404' })
          }
        }).catch( ( error ) => {
          console.log( error )
        })

      }

    } else {

      // Only get data if we don't already have it.
      return HTTP.get( modifier.posts ).then( ( response ) => {
        if ( response.status === 200 && response.data.length > 0 ) {

          // Set blog pull status to true.
          commit( 'setBlogPullStatus', true )

          // Set date of that pull.
          commit( 'setBlogPullTimeStamp', ( new Date() ).getTime() )

          // Set placeholder array.
          const postArray = []

          // Remove unecessary data from object.
          response.data.map( ( post ) => {
            const filtered = {
              content: post.content.rendered,
              excerpt: post.excerpt.rendered,
              featuredImage: post.featured_image,
              id: post.id,
              modifiedDate: post.modified,
              slug: post.slug,
              title: post.title.rendered
            }

            // Return new array object.
            return postArray.push( filtered )
          })

          // Get object in array.
          const posts = postArray

          commit( 'setPosts', { posts })
        } else {
          // If we don't recieve data push to 404 post.
          router.push({ name: '404' })
        }
      }).catch( ( error ) => {
        console.log( error )
      })
    }

  },
  getMenus: ({ commit, state }) => {
    return HTTP.get( modifier.menus ).then( ( response ) => {
      if ( response.status === 200 && response.data.length > 0 ) {
        commit( 'setMenus', response.data )
      }
    }).catch( ( error ) => {
      console.log( error )
    })
  }
}
