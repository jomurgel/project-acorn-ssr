# Change Log

## Generaly Cleanup and Update
### [1.0.4](https://github.com/jomurgel/project-acorn-ssr/tree/1.0.4) (2018-08-31)

#### Changed
- Updates utilities to ES6 format.
- Imports utility functions, `* as utility`.
- Updates documentation to reflect changes.
- Webpack Client `cacheChunks` configuration.

#### Removes
- Unecessary/unused dependencies and imports.

#### Fixed
- Typo in category function.

## Better CPT Support
### [1.0.3](https://github.com/jomurgel/project-acorn-ssr/tree/1.0.3) (2018-05-21)

#### Added
- `post.type` to post object.
- `post_type` param to post `router-link`.

#### Changed
- Makes api locations singular.
- Changes blog index slug to `posts` from `blog`.
- Renames Archive template to Category — only used for categories.
- Replaces hardcoded `/blog/:slug` route with `/:post_type/:slug` to make adding CPTs easier.
- Makes plural modifier routes singular in `actions.js`.
- Renames `Blog.vue` to `Posts.vue`.
- Updates blog route name — now 'posts'.
- Replaces single api call slug with payload which includes slug and post type.
- Updates store for archives.
- Changes README.md where needed.
- Store for archive `blog` to archive `post`.

#### Removes
- Ternary for post type setting backup to 'blog'

#### Fixed
- Typo in `locations.js` file.
- Issue with post/blog confusion after update.

## No Caching in Dev Mode
### [1.0.2](https://github.com/jomurgel/project-acorn-ssr/tree/1.0.2) (2018-05-13)

#### Added
- Check for `is Development` when making API requests.
- Avoids caching vuex store data while in development mode.

## Webpack 4 Update
### [1.0.1](https://github.com/jomurgel/project-acorn-ssr/tree/1.0.1) (2018-03-29)

#### Changed
- Updated dependencies.
- Added component view for Blog.
- Moves Vue Analytics from `app.js` to `entry-client.js`.

#### Fixed
- Errors as a result of dependency updates.
- Fixes issues with changing routes from category to archive (category to blog).

#### Removes
- Blog and Archive transition group styles — no longer in use.

## Category Support
### [1.0.0](https://github.com/jomurgel/project-acorn-ssr/tree/0.1) (2018-03-29)

#### Added
- Support of categories.
- More robust store and better handling of post data.
- Cleaner transition for Archive transition groups.
- Changelog added.
- Post-Item and Post-Single components for rendering list data or a page from an object.
- Additional checks and data validation.
- Better caching and data handling to mitigate multiple requests.
- Adds `objectSize` function to get the length of an object.
- Adds category request with menus before render.
- Basic Default WordPress element styles for media, alignment, etc.

#### Changed
- State object — all posts handled by post object regardless of post type.
- Utilize the route name and params vs direct calls.
- Renames Blog.vue to Archive.vue.
- Updates dependencies.
- Documentation to reflect changes.
- Removed `pullDate` for every object (retained for menu and categories), and adds `pullDate` to individual posts.
- Uses post `pullDate` to pull only outdated posts instead of a full page or store requests.
- Stores post objects by `id` and stores only ids for reference in new store archive object.

#### Deprecated
- Blog.vue

#### Removed
- Direct route calls.
- Console logging left over from testing.

#### Fixed
- Some issues with `beforeRouteEnter` which call in views making duplicate requests.
- Issues when navigating routes, but utilizing the same view component.
- Various 404 bugs.
- General cleanup.

Feature/category support [\#1](https://github.com/jomurgel/project-acorn-ssr/pull/1) ([jomurgel](https://github.com/jomurgel))
## Initial Release
### [0.0.1](https://github.com/jomurgel/project-acorn-ssr/tree/0.0.1) (2018-03-02)
