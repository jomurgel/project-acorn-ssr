<template>
  <postSingle v-if="post" :key="post.id" :post="post" class="post" />
  <div v-else><!-- 404 Handler --></div>
</template>

<script>
import { mapGetters } from 'vuex'
import postSingle from './components/Post-Single'
import {
  setTitle,
  setDescription,
  setFeaturedImage } from '@src/utilities/helpers'

export default {
  components: {
    postSingle
  },
  meta() {
    const meta = {
      title: this.title,
      description: this.description,
      card: this.featuredImage
    }
    return meta
  },
  asyncData({ store, route }) {
    const payload = { type: route.params.type || 'post', count: parseInt( route.params.page ) || 1 }

    return store.dispatch( 'getPost', payload )
  },
  computed: {
    ...mapGetters({
      post: 'singlePost'
    }),
    title: function() {
      return setTitle( this.post )
    },
    description: function() {
      return setDescription( this.post )
    },
    featuredImage: function() {
      return setFeaturedImage( this.post )
    }
  },
  beforeRouteUpdate( to, from, next ) {
    if ( ! this.$store.getters.singlePost ) {
      next({ name: '404', params: { error: '404' } })
    }
    next()
  },
  beforeRouteEnter( to, from, next ) {
    next( vm => {
      if ( ! vm.$store.getters.singlePost ) {
        next({ name: '404', params: { error: '404' } })
      }
    })
  }
}
</script>