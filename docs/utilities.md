# Utilities
A series of helper utilities to handle a variety of things.

  * [index.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/utilities/index.js)
  * [metaMixin.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/utilities/metaMixin.js)

## index.js (utility helpers)
This partial contains helpers for returning the menu to be used within the [Navigation.vue](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/views/components/Navigation.vue) component.

Takes in the menus array and returns the menu that matches the slug provided by props.

``` javascript
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
```

The `setTitle`, `setDescription`, and `setFeaturedImage` functions return those from post object data.

The `getPagePullStatus` determines if a post object has already been pulled by confirming that it DOES have an assigned page number. Posts pulled by the `singlePost` action returns a `pageNumber` value of `0` which is not a valid option within the REST API.

There is an `objectSize` function which, similar to determining the length of an array, returns a number from 0 for empty to 1, 2, 3 for length of an object.

`capitalize` captitalizes a string — used on the navigation.

The `findUniquePost` function does exactly what it suggests. It takes in a post array and returns only unique values comparing item values.


``` javascript
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
```

`matchCategoryToId` takes an array of categrories and a slug and returns, if there is a match, and id else returns null.

``` javascript
/**
 * Return ID from category slug.
 *
 * @export
 * @param {any} array array of categories
 * @param {any} slug category slug
 */
export const matchCategoryToId =( array, slug ) => {

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
```

## metaMixin.js
This handles meta data both client and server side pulling data as defaults from the [webconfig.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/webconfig.js) file.

Special note on [Line 39](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/utilities/metaMixin.js#L39). We're grabbing our meta by tag name and using those values to updates meta. This is done specifically due to the facebook/twitter `og:` data.

These datapoints can be defined within components using the `meta()` function. If none are supplied the global values are used.

``` javascript
meta() {
const meta = {
    title: TITLE,
    description: DESCRIPTION,
    card: IMAGE URL
  }
  return meta
}
```
