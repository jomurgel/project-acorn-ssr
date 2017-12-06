const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  extractCSS: isProd,
  preserveWhitespace: false,
  postcss: [
    require( 'autoprefixer' )({
      browsers: ['last 2 versions']
    })
  ],
  cssModules: {
    localIdentName: isProd ? '[hash:base64]' : '[name]---[local]---[hash:base64:5]',
    camelCase: true
  }
}
