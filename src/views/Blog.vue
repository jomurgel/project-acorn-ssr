<template>
  <div class="posts">
    <div v-for="post in posts" :key="post.id" class="post">
      <h2>
        <router-link :to="$route.path + '/' + post.slug"> {{ post.title }}</router-link>
      </h2>
      <div v-html="post.excerpt"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  asyncData({ store }) {
    return store.dispatch( 'getPosts' )
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
      posts: 'posts'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
