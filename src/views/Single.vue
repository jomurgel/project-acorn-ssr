<template>
  <div v-if="post" :key="post.id" class="post">
    <h1>{{ title }}</h1>
    <div v-html="post.content"></div>
  </div>
  <div v-else><!-- 404 Handler --></div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  setTitle,
  setDescription,
  setFeaturedImage } from '@src/utilities/helpers'

export default {
  meta() {
    const meta = {
      title: this.title,
      description: this.description,
      card: this.featuredImage
    }
    return meta
  },
  asyncData({ store, route }) {
    return store.dispatch( 'getPost', route.params.slug )
  },
  computed: {
    ...mapGetters({
      posts: 'posts'
    }),
    post: function() {
      return this.$store.state.posts[this.$route.params.slug]
    },
    title: function() {
      return setTitle( this.post )
    },
    description: function() {
      return setDescription( this.post )
    },
    featuredImage: function() {
      return setFeaturedImage( this.post )
    }
  }
}
</script>