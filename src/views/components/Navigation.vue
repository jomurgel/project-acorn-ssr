<template>
  <ul>
    <li>
      <router-link :to="{ path: '/' }"><icon name="acorn" /></router-link>
    </li>
    <template v-if="setMenu">
    <li v-for="item of setMenu.items" :key="item.object_slug">
      <router-link v-if="'blog' === item.object_slug" :to="{ name: 'posts', params: { page: 1, type: 'post' } }">{{ item.title }}</router-link>
      <router-link v-else-if="'category' === item.object" :to="{ name: 'category', params: { page: 1, type: item.object_slug } }">{{ upperCase( item.title ) }}</router-link>
      <router-link v-else :to="{ path: '/' + item.object_slug }">{{ item.title }}</router-link>
    </li>
    <li>
      <router-link :to="{ path: '/dfdsa' }">Page 404</router-link>
    </li>
    <li>
      <router-link :to="{ path: '/blog/dfdsa' }">Single 404</router-link>
    </li>
    </template>
    <template v-else>
      <li>
        <a :href="addMenu" target="_blank">
          Add a {{ this.$props.location }} menu
        </a>
      </li>
    </template>
  </ul>
</template>

<script>
import { returnQueriedMenu, capitalize } from '@src/utilities/helpers'
import { BASE_URL } from '@root/webconfig.js'

export default {
  props: ['location'],
  data() {
    return {
      'menu': this.$store.state.navigation.menus,
      'addMenu': BASE_URL + '/wp-admin/nav-menus.php' // Reroute to server install.
    }
  },
  computed: {
    setMenu() {
      return returnQueriedMenu( this.menu, this.$props.location )
    }
  },
  methods: {
    upperCase: function( string ) {
      return capitalize( string )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~functions';

.icon-acorn {
  vertical-align: bottom;

  a {
    color: #000;
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: inline;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    a:hover {
      color: $pink;
    }
  }
}
</style>
