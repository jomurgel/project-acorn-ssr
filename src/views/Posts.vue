<template>
  <div class="posts">
    <div v-for="post in posts" :key="post.id" class="post">
      <h3>{{post.id}}. {{post.title.rendered}}</h3>
      <div v-html="post.excerpt.rendered"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  title: 'Posts',
  asyncData({ store }) {
    return store.dispatch( 'getPosts' )
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
