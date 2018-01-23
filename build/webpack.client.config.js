const webpack            = require( 'webpack' )
const merge              = require( 'webpack-merge' )
const base               = require( './webpack.base.config' )
const VueSSRClientPlugin = require( 'vue-server-renderer/client-plugin' )
const SWPrecachePlugin   = require( 'sw-precache-webpack-plugin' )

const config = merge( base, {
  entry: {
    app: './src/entry-client.js',
    vendor: ['axios', 'vue', 'vue-router', 'vuex', 'vuex-router-sync']
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV || 'development' ),
      'process.env.VUE_ENV': '"client"'
    }),
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
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: "project-acorn-ssr",
      filename: "service-worker.js",
      minify: true,

      staticFileGlobs: [
        "dist/**.css",
        "dist/**.js",
        "dist/img/**/*"
      ],

      runtimeCaching: [{
        urlPattern: /\/.*/,
        handler: "networkFirst"
      }],

      dontCacheBustUrlsMatching: /./,
      navigateFallback: "/",
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
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

module.exports = config
