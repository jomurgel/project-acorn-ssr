# Routing

This app utilizes [vue-router](https://router.vuejs.org/en/) to handle our page links, 404 handling, and general navigation.

This follows the default router setup as referenced in the [documentation](https://router.vuejs.org/en/essentials/getting-started.html) but has several custom navigation guards and route match handling to help us with our more natural `:slug`-based permalinks and 404 handling.

## :slug
While trying to work with pretty permalinks it occured to me that Vue router may not expect a use case where links might be `/about` or `/contact` generated dynamically from a set of data. In this case we're using the WordPress REST API menu endpoint built into the [Project Acorn Theme](https://github.com/jomurgel/project-acorn) to dynamically create our primary navigation and routes.

The problem with this is that there is no way out of the box to determine that `/about` is valid and `/dggh` is invalid. For that matter no way to determine that `/404`, our 404 component, doesn't belong within the scope of `/:slug`. In this case the [history-mode caveate fallback](https://router.vuejs.org/en/essentials/history-mode.html) doesn't work as expected.

Our blog single and page components take advantage of the `beforeEnter` navigation guard to help us out. While our router isn't doing the heavy lifting of redirecting in the event of an error, it is ensuring that we stay within the expected component, in this case the `404` component.

Our heavy lifting takes place inside the [api](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/api.md) helpers, but the router's matching priority is defined from top to bottom, even through our path `/404` matches our `404` component, it also, and firstly, matches the `/:slug` criteria.

``` javascript
beforeEnter: ( to, from, next ) => {
	// Handler for refresh or if we land and redirect to page component.
	if ( to.params.slug === '404' ) {
	next({ name: '404', params: { slug: '404' } })
	}
	next()
}
```

Our `beforeEnter` handler ensure that if our intended route is to the 404 component, we force the push there rather than re-rendering the `page` or `single` components, otherwise go about our business as usual.

More on how we're handling errors [here](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/api.md).
