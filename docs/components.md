# Partial Components

## Footer.vue
This component renders below the `router-view` which contains render of the copyright information, site name, copyright year, author URL, and author name.

The year is stimply determined by a current date function.

``` javascript
getYear() {
  // Get get current year for copyright.
  let currentTime = new Date()
  let currentYear = currentTime.getFullYear()
  return currentYear
}
```

## Header.vue
This component renders above the `router-view` which holds the navigation ncomponent.

## Navigaton.vue
This component handles display of the navigation. It utilizes one prop, location, which coropsonds to the location of the menu in the WordPress install.

``` javascript
props: ['location']
```

Usage
``` javascript
<navigation location="main" />
```

If the location is not found it will promt to add a menu and link directly back to the WordPress install's `nav-menus.php` admin.

There are several placeholder routes `Page 404` and `Single 404` which were added for testing.

I've also added the logo here, but could also be added to the [Header.vue](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/views/components/Header.vue) component if desired.

## Pagination.vue
This component handles pagination for the blog page. Utilizes several props:

``` javascript
props: {
  // Current Page
  currentPage: {
    type: Number,
    required: true
  },
  // Total number of pages
  maxPage: Number,
  // Check if page is less than max page.
  hasMore: Boolean
}
```

Usage
``` javascript
<pagination :current-page="NUMBER" :max-page="NUMBER" :has-more="BOOLEAN" />
```

## Post-Item.vue
Accepts a post object as props and renders a list item.

Usage
``` javascript
<postItem :post="post" />
```

## Post-Single
Accepts a post object as props and renders a post article.

Usage
``` javascript
<postSingle :post="post" />
```
## ProgressBar.vue
This component was appropriated by [nuxt.js](https://nuxtjs.org/) https://github.com/nuxt/nuxt.js/blob/dev/lib/app/components/nuxt-loading.vue