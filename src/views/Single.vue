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
    return store.dispatch( 'getPosts' )
  },
  computed: {
    ...mapGetters({
      posts: 'posts'
    }),
    type: function() {
      return this.posts
    },
    page: function() {
      return setSinglePost( this.$route.params.slug, this.type )
    },
    title: function() {
      return setTitle( this.page )
    },
    description: function() {
      return setDescription( this.page )
    },
    featuredImage: function() {
  beforeRouteUpdate( to, from, next ) {
    const pageArray = this.$store.state.pages
    const test = pageArray.map( ( object ) => { return object.slug })

    if ( test.indexOf( to.params.slug ) > -1 ) {
      next()
    } else {
      next({ name: '404', params: { '0': to.path } })
    }
  }
}
</script>