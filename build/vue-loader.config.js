const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  extractCSS: isProduction,
  preserveWhitespace: false,
  postcss: [
    require( 'autoprefixer' )({
      browsers: ['last 2 versions']
    })
  ],
  cssModules: {
    localIdentName: isProduction ? '[hash:base64]' : '[name]---[local]---[hash:base64:5]',
    camelCase: true
  }
}
