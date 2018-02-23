## Get Started

Install all necessary packages..
``` bash
$ npm install
```

Next configure the [webconfig.js](https://github.com/jomurgel/project-acorn-ssr/blob/master/webconfig.js) file to customizer your data output, defaults, etc.

### Webconfig Options

``` javascript
module.exports = {
  PORT: '8080',
  TITLE: 'Default Site Title',
  DESCRIPTION: 'Default Site Description',
  CARD_IMAGE: 'Default site image url for Twitter/Facebook',
  SITE_URL: 'https://localhost:8080',
  BASE_URL: 'https://vue-app.jomurgel.com/server', // no trailing slash
  ICON: 'favicon.png', // roots to ./public/ folder
  AUTHOR: 'NAME',
  AUTHOR_URL: 'URL',
  POSTS_PER_PAGE: NUMBER,
  ANALYTICS: 'UA-XXXXX-X'
}
```

The `SITE_URL` should corospond to the dev or production environment.  `https://localhost:8080` is the default, but `yoursite.com` would be your production `SITE_URL` for example. I'm working on making this a bit more dynamic.

### Working
Control dev/production invironments using commands listed below.

``` bash
#Node Dev Server
$ npm run dev

#Compile SVG Sprite
$ npm run svg

# Production Build
$ npm run build

# Start Server in Production Mode
$ npm run start

# Build and run in production mode.
$ npm run go
```

View and test at [http://localhost:8080](http://localhost:8080).
