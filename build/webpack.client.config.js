const path               = require( 'path' )
const webpack            = require( 'webpack' )
const merge              = require( 'webpack-merge' )
const base               = require( './webpack.base.config' )
const VueSSRClientPlugin = require( 'vue-server-renderer/client-plugin' )
const SWPrecachePlugin   = require( 'sw-precache-webpack-plugin' )

const isProduction  = process.env.NODE_ENV === 'production'

const config = merge( base, {
  entry: {
    app: './src/entry-client.js',
    vendor: ['axios', 'vue', 'vue-router', 'vuex', 'vuex-router-sync']
  },
  plugins: [
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor'],
      children: true,
      async: true,
      minChunks: function( module ) {
        // a module is extracted into the vendor chunk if...
        return module.context && module.context.indexOf( 'node_modules' ) !== -1
      }
    }),
    /**
     * Extract webpack runtime & manifest to avoid vendor chunk hash changing on every build.
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
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
