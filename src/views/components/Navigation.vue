<template>
  <ul v-if="setMenu">
    <li>
      <router-link :to="{ path: '/' }"><icon name="acorn" /></router-link>
    </li>
    <li v-for="item of setMenu.items" :key="item.object_slug">
      <router-link :to="{ path: '/' + item.title.toLowerCase() }">
          {{ item.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { returnQueriedMenu } from '@src/utilities/helpers'

export default {
  props: ['location'],
  data() {
    return {
      'menu': this.$store.state.menus
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
 
