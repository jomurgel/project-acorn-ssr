# Views & Components

  * [Common Use](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/common.md)
  * [Partial components](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/components.md)

## _App.vue
Contains our [Header](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/views/components/Header.vue) and [Footer](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/views/components/Footer.vue) components along with our main `<router-view />`.

Checks to make sure our site and components have loaded to avoid flicker.

Utilizes basic fade transition.

``` javascript
<transition name="fade" mode="out-in">
  <router-view class="view" />
</transition>
```

With SASS styles
``` SCSS
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
```

## 404.vue
A standard 404 template. Sets `headers.status` using the `metaMixin` function.

Usage
``` javascript
meta() {
  const meta = {
    title: this.title,
    description: 'Description for 404',
    card: 'https://placehold.it/1280x768/f60/fff?text=404',
    statusCode: 404
  }
  return meta
}
```

## Blog.vue
Renders paginated blog page.

Notes on pagination component [here](https://github.com/jomurgel/project-acorn-ssr/blob/master/docs/components.md).

## Custom.vue
Generic template. In sure for the homepage currently.

## Page.vue
Utilizes and renders the `$store.state.pages` object.

Handles 404 rendering based on slugs on `beforeRouteUpdate` and `beoreRouteEnter`.

## Single.vue
Utilizes and renders a single `$store.state.posts` object.

Handles 404 rendering based on slugs on `beforeRouteUpdate` and `beoreRouteEnter`.

Utilizes the `getPost` [action](https://github.com/jomurgel/project-acorn-ssr/blob/master/src/store/actions.js#L38) to define the output content.
