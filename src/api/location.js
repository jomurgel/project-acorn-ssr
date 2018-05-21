/**
 * Set api locations for posts, menus, and pages.
 *
 * @export variable modifier
 */
const baseLocation = 'wp/v2/'

export const modifier = {
  base: '/' + baseLocation,
  category: baseLocation + 'categories',
  menus: 'wp-api-menus/v2/menus',
  page: baseLocation + 'pages',
  post: baseLocation + 'posts'
}
