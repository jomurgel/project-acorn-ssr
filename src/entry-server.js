import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise( ( resolve, reject ) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    const { url } = context
    const fullPath = router.resolve( url ).route.fullPath

    if ( fullPath !== url ) {
      // eslint-disable-next-line
      reject({ url: fullPath })
    }

    // set router's location
    router.push( url )

    // wait until router has resolved possible async hooks
    router.onReady( () => {

      const matchedComponents = router.getMatchedComponents()

      // no matched routes
      if ( ! matchedComponents.length ) {
        // eslint-disable-next-line
        reject({ code: 404 })
      }
      // Fetch our global elements first, then resolve promise for async data.
      store.dispatch( 'getMenus' ).then( () => {

        // call `asyncData()` on all matched route component
        Promise.all( matchedComponents.map( component => {
          if ( component.asyncData ) {
            return component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        }) ).then( () => {
          isDev && console.log( `data pre-fetch: ${Date.now() - s}ms` )
          // After all preFetch hooks are resolved, our store is now
          // filled with the state needed to render the app.
          // Expose the state on the render context, and let the request handler
          // inline the state in the HTML response. This allows the client-side
          // store to pick-up the server-side state without having to duplicate
          // the initial data fetching on the client.
          context.state = store.state
          // Fetch the global objects then resolve the app.
          resolve( app )
        }).catch( reject )
      }, reject )
    })
  })
}
