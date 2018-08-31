<template>
  <postSingle v-if="post" :key="post.id" :post="post" class="post" />
  <div v-else>{{ $store.getters.singlePost }}<!-- 404 Handler --></div>
</template>

<script>
import { mapGetters } from 'vuex'
import postSingle from './components/Post-Single'
import * as utility from '@src/utilities'

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
    return store.dispatch( 'getPage', route.params.slug )
  },
  computed: {
    ...mapGetters({
      post: 'singlePost'
    }),
    title: function() {
      return utility.setTitle( this.post )
    },
    description: function() {
      return utility.setDescription( this.post )
    },
    featuredImage: function() {
      return utility.setFeaturedImage( this.post )
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