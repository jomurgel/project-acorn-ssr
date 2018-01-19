module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
	  sourceType: 'module'
	},
	env: {
	  node: true,
	  browser: true
	},

	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: 'standard',

	// required to lint *.vue files
	plugins: [
	  'html'
	],

	// add your custom rules here
	'rules': {

	  // allow paren-less arrow functions
	  'arrow-parens': 0,

	  // allow async-await
	  'generator-star-spacing': 0,

	  // allow debugger during development
	  'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

	  // allow and not allow space before function parentheses
	  'space-before-function-paren': [ 'error', { 'anonymous': 'always', 'named': 'never' }],
	  'space-in-parens': [ 'error', 'always', { 'exceptions': [ '{}', 'empty' ] }],
	  'space-unary-ops': [ 1, {'words': true, 'nonwords': true, 'overrides': {
			  '-': false,
			  '+': false
			} }],
	  'key-spacing': [ 'error', { 'mode': 'minimum' } ],
	  'padded-blocks': [0],
	  'no-unused-expressions': [0],
	  'no-sequences': [0],
	  'no-multi-spaces': ['error', { exceptions: { 'ImportDeclaration': true, 'VariableDeclarator': true, 'Property': false } }],
	  'space-before-function-paren': ['error','never']
	}
  }
