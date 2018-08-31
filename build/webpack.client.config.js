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
  optimization:{
    runtimeChunk: {
        name: "manifest"
    },
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    // extract vendor chunks for better caching
    splitChunks:{
        chunks:"initial",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
    }
  },
  plugins: [
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
