# API Handling

This app is built to utilize the [WordPress REST API](https://developer.wordpress.org/rest-api/reference/) exclusively using [axios](https://github.com/axios/axios) and [vuex](https://github.com/vuejs/vuex). Though it could be used without it, I highly recommend cloning or forking the [Project Acorn Theme](https://github.com/jomurgel/project-acorn) which has some additional endpoints and functionality to make your live abundantly easier.

The api directory contains three files for working with out API requests and endpoints.

## index.js
Our api index forms a global helper function to make a requests for posts, pages, etc called `makePostRequest`, handle some errors, reroute to 404 if necessary or return a response for use with our [Vuex](https://github.com/vuejs/vuex) store.

Usage
``` javascript
 return makePostRequest( URL ).then( response => {
	 // do something
 })
```

This checks to make sure our data exists or the request is valid and returns a filtered array (removing all of the uncessary post data) and keeping the store clean.

If the request is invalid, or the data object is empty we route to the `404` component. More about that [here](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/router.md).

The WordPress REST API will return a `200` header status regardless of whether or not data is returned. As a result we're making several checks inside our `makePostRequest` function before we pass data to the [vuex](https://github.com/vuejs/vuex) store.

If our response status is `200` AND we don't have any data OR our response is empty OR our response status is anything other than `200` we're pushing our route to `400` which will then render the [404 component](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/views/404.vue).

``` javascript
// 404 if we have a good response, but no data.
// OR no response.
// OR anything other than a 200 response.
if ( ( response.status === 200 && response.data.length === 0 ) || response.length === 0 || response.status !== 200 ) {

	// Push to 404 component.
	router.push({ name: '404', params: { slug: '404' } })
}
```

This file also contains a helper function specifically for menus called `makeMenuRequest` which returns the response.data to be worked with elsewhere.

The usage for `makeMenuRequest` is the same as `makePostRequest`.

## baseurl.js
Grabs our `BASE_URL` from our [webconfig.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/webconfig.js) file and sets up our WordPress root URL for making our requests in [index.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/api/index.js).

``` javascript
import axios from 'axios'
import { BASE_URL } from '@root/webconfig'

export const HTTP = axios.create({
  baseURL: BASE_URL + '/wp-json/'
})
```

## location.js
Locations are an object of our endpoints in use. By default, posts, menus (as custom endpoint), and pages.

``` javascript
export const modifier = {
  posts: 'wp/v2/posts',
  menus: 'wp-api-menus/v2/menus',
  pages: 'wp/v2/pages'
}
```