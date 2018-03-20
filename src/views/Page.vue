<template>
  <div v-if="page" :key="page.id">
    <h1>{{ title }}</h1>
    <div v-html="page.content"></div>
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
    return store.dispatch( 'getPage', route.params.slug )
  },
  computed: {
    ...mapGetters({
      page: 'singlePage'
    }),
    title: function() {
      return setTitle( this.page )
    },
    description: function() {
      return setDescription( this.page )
    },
    featuredImage: function() {
      return setFeaturedImage( this.page )
    }
  },
  beforeRouteUpdate( to, from, next ) {
    if ( ! this.$store.getters.singlePage ) {
      next({ name: '404', params: { slug: '404' } })
    }
    next()
  },
  beforeRouteEnter( to, from, next ) {
    next( vm => {
      if ( ! vm.$store.getters.singlePage ) {
        next({ name: '404', params: { slug: '404' } })
      }
    })
    next()
  }
}
</script>