<template>
  <ul>
    <li>
      <router-link :to="{ path: '/' }"><icon name="acorn" /></router-link>
    </li>
    <template v-if="setMenu">
    <li v-for="item of setMenu.items" :key="item.object_slug">
      <router-link :to="{ path: '/' + item.object_slug }">
          {{ item.title }}
      </router-link>
    </li>
    <li>
      <router-link :to="{ path: '/dfdsa' }">404</router-link>
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
import { returnQueriedMenu } from '@src/utilities/helpers'
import { BASE_URL } from '@root/webconfig.js'

export default {
  props: ['location'],
  data() {
    return {
      'menu': this.$store.state.menus,
      'addMenu': BASE_URL + '/wp-admin/nav-menus.php'
    }
  },
  computed: {
    setMenu() {
      return returnQueriedMenu( this.menu, this.$props.location )
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-acorn {
  vertical-align: bottom;

  a & {
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

    a {
      text-decoration: none;
    }
  }
}
</style>
 
