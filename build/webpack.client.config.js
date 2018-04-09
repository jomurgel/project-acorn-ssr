const path               = require( 'path' )
const webpack            = require( 'webpack' )
const merge              = require( 'webpack-merge' )
const base               = require( './webpack.base.config' )
const VueSSRClientPlugin = require( 'vue-server-renderer/client-plugin' )
const SWPrecachePlugin   = require( 'sw-precache-webpack-plugin' )

const isProduction  = process.env.NODE_ENV === 'production'

const config = merge( base, {
  entry: {
    app: './src/entry-client.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
      }
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV || 'development' ),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

// Only during production.
if ( isProduction ) {

  config.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'project-acorn-ssr',
      filename: 'service-worker.js',
      minify: true,

      staticFileGlobs: [
        'dist/**.css',
        'dist/**.js',
        'dist/img/**/*'
      ],

      runtimeCaching: [{
        urlPattern: /\/.*/,
        handler: 'networkFirst'
      }],

      dontCacheBustUrlsMatching: /./,
      navigateFallback: '/'
    })
  )
}

module.exports = config
