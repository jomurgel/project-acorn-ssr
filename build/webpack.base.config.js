const path                 = require( 'path' )
const webpack              = require( 'webpack' )
const vueConfig            = require( './vue-loader.config' )
const ExtractTextPlugin    = require( 'extract-text-webpack-plugin' )
const FriendlyErrorsPlugin = require( 'friendly-errors-webpack-plugin' )

const isProduction         = process.env.NODE_ENV === 'production'
const resolve              = dir => path.join( __dirname, '..', dir )

const config = {
  devtool: isProduction ? false : '#cheap-module-source-map',
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: resolve( 'dist' ),
    publicPath: '/dist/',
    filename: 'js/[name].[chunkhash:8].js'
  },
  resolve: {
    modules: [resolve( 'src' ), 'node_modules'],
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      '@src': resolve( 'src' ),
      '@public': resolve( 'public' ),
      '@assets': resolve( 'assets' ),
      '@root': path.resolve( __dirname, '..' ),
			'@views': path.resolve( __dirname, '../src/views' ),
      'styles': path.resolve( __dirname, '../assets/scss/styles.scss' ),
      'functions': path.resolve( __dirname, '../assets/scss/functions/index.scss' )
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve( 'src' ), resolve( 'test' )],
        options: {
          formatter: require( 'eslint-friendly-formatter' )
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'sass-loader'],
            fallback: 'vue-style-loader'
          })
          : ['vue-style-loader', 'sass-loader', 'css-loader']
      },
      {
        test: /sprite\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        exclude: /sprite\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 256,
          name: 'img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 256,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProduction ? 'warning' : false
  },
  plugins: isProduction
    ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].[contenthash:8].css'
      })
    ]
    : [
      new FriendlyErrorsPlugin()
    ]
}

module.exports = config
