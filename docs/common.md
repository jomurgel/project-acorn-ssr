# Common Use Components
These global common use components provide addtional support for svg-icon rendering. It uses [SVG Sprite](https://github.com/jkphl/svg-sprite) to optimize and compile SVG icons into a single sprite for easy-use with some additional inspiration from [Vue SVG Sprite](https://www.npmjs.com/package/vue-svg-sprite)

## Icon.vue
Creates the component for easily rendering the component. Uses many props.

``` javascript
props: {
  name: {
      type: String,
      required: true
  },
  width: {
      type: Number,
      default: 24
  },
  height: {
      type: Number,
      default: 24
  }
}
```

Usage
``` javascript
<icon name="acorn" />
```

Output of the handler is found `build` folder under [svg-sprite.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/build/svg-sprite.js).

Where the name refers to a SVG file located in the `root > assets > icons` folder.

## index.js
This file handles the dynamic registration/generation of the SVG component. 

More documentation on that [here](https://vuejs.org/v2/api/#Vue-component).

## Run SVG Compile
``` bash
#Compile SVG Sprite
$ npm run svg
```