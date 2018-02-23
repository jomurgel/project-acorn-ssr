const fs                       = require( 'fs' )
const path                     = require( 'path' )
const LRU                      = require( 'lru-cache' )
const express                  = require( 'express' )
const favicon                  = require( 'serve-favicon' )
const compression              = require( 'compression' )
const { createBundleRenderer } = require( 'vue-server-renderer' )

// Get webconfig.js object.
const { PORT: defaultPort, TITLE: defaultTitle, DESCRIPTION: defaultDescription, CARD_IMAGE: defaultCardImage, ICON: siteIcon, SITE_URL: siteUrl } = require( './webconfig' )

const isProduction  = process.env.NODE_ENV === 'production'
const resolve       = file => path.resolve( __dirname, file )
const useMicroCache = process.env.MICRO_CACHE !== 'false'

const app      = express()
const template = fs.readFileSync( resolve( './public/index.html' ), 'utf-8' ).replace( />( \s|\n )+</g, '><' )

// Witness the magic!
function createRenderer( bundle, options ) {

  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer( bundle, Object.assign( options, {
    template,

    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve( './dist' ),
    // recommended for performance
    runInNewContext: false
  }) )
}

const serve = ( path, cache ) => express.static( resolve( path ), {
  maxAge: cache && isProduction ? 1000 * 60 * 60 * 24 * 30 : 0
})

let renderer
let readyPromise

if ( isProduction ) {

  // In production: create server renderer using built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const bundle = require( './dist/vue-ssr-server-bundle.json' )

  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require( './dist/vue-ssr-client-manifest.json' )
  renderer = createRenderer( bundle, {
    clientManifest
  })

} else {

  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require( './build/dev-server' )( app, ( bundle, options ) => {
    renderer = createRenderer( bundle, options )
  })
}

app.use( compression({ threshold: 0 }) )

// Set favicon.
app.use( favicon( './public/' + siteIcon ) )

// Set distribution and public directories.
app.use( '/dist', serve( './dist', true ) )
app.use( '/public', serve( './public', true ) )
app.use( '/manifest.json', serve( './public/manifest.json', true ) )
app.use( '/service-worker.js', serve( './dist/service-worker.js' ) )

// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const microCache = LRU({
  max: 100,
  maxAge: 1000
})

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
const isCacheable = req => useMicroCache

function render( req, res, context ) {

  const s = Date.now()

  res.setHeader( "Content-Type", "text/html" )

  // Do the errors. DO IT!
  const handleError = err => {

		res.status( 500 ).end( '500 | Internal Server Error' )

    console.error(`Fatal error when rendering : ${req.url}`)
    console.error( `error during render : ${req.url}` )
    console.error( err.stack )
  }

  const cacheable = isCacheable( req )

  if ( cacheable ) {
    const hit = microCache.get( req.url )

    if ( hit ) {

      if ( ! isProduction ) {
        console.log( `cache hit!` )
      }
      return res.end( hit )
    }
  }

  renderer.renderToString( context, ( err, html ) => {

    res.status( context.meta.statusCode || 200 )

		console.log( `Whole request: ${Date.now() - s}ms` )

    if ( err ) {
      return handleError( err )
    }

    res.end( html )

    if ( cacheable ) {
      microCache.set( req.url, html )
    }

    if ( ! isProduction ) {
      console.log( `whole request: ${Date.now() - s}ms` )
    }
  })
}

app.get( '*', ( req, res ) => {

  const fullSiteUrl = isProduction ? siteUrl : req.protocol + '://' + req.get( 'host' )

  const context = {
    meta: {
      title: defaultTitle, // default title
      description: defaultDescription, // default description
      card: defaultCardImage, // image to be used with og/twitter sharing
      statusCode: 200, // header.status code
    },
    url: req.url, // path aka /about
    fullUrl: fullSiteUrl + req.originalUrl // full url + path
  }

  isProduction ?
    render( req, res, context ) :
    readyPromise.then( () => render( req, res, context ) )
})

// Set dev port number from webconfig.js
const port = process.env.PORT || defaultPort

app.listen( port, () => {
  console.log( `server started at localhost:${port}` )
})
