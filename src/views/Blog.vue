<template>
  <div class="posts">
    <div v-for="post in posts" :key="post.id" class="post">
      <h2>
        <router-link :to="$route.path + '/' + post.slug"> {{ post.title }}</router-link>
      </h2>
      <div v-html="post.excerpt"></div>
    </div>
    <ul class="pagination">
      <li v-for="n in totalPages" :key="n">
        <router-link :to="{ name: $route.name + '/' + n }">
          {{ n }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { POSTS_PER_PAGE } from '@root/webconfig'
import { returnPostsByPage } from '@src/utilities/helpers'

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: POSTS_PER_PAGE,
      totalItems: this.$store.state.postCount,
      totalPages: Math.round( this.$store.state.postCount / POSTS_PER_PAGE )
    }
  },
  asyncData({ store, route }) {
    return store.dispatch( 'getPosts', route.params.id || 1 )
  },
  meta() {
    const meta = {
      title: 'Posts',
      description: 'Description for Posts',
      card: 'https://placehold.it/1280x768/f60/fff?text=HPOSTS'
    }
    return meta
  },
  computed: {
    ...mapGetters({
      postsArray: 'posts'
    }),
    posts() {
      return returnPostsByPage( this.postsArray, this.$route.params.id || 1 )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
