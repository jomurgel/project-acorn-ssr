/**
 * Set api locations for posts, menus, and pages.
 *
 * @export variable modifier
 */
const baseURL = 'wp/v2/'

export const modifier = {
  base: '/' + baseURL,
  category: baseURL + 'categories',
  menus: 'wp-api-menus/v2/menus',
  page: baseURL + 'pages',
  post: baseURL + 'posts'
}
