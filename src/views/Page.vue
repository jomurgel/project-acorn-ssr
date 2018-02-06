<template>
  <div v-if="page" :key="page.id">
    <h1>{{ title }}</h1>
    <div v-html="page.content"></div>
  </div>
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
    // This happens last.
    console.log( '4' )
    // console.log( store.state.pages )
    return store.dispatch( 'getPage', route.params.slug )
  },
  computed: {
    ...mapGetters({
      pages: 'pages'
    }),
    page: function() {
      return this.$store.state.pages[this.$route.params.slug]
    },
    title: function() {
      return setTitle( this.page )
    },
    description: function() {
      return setDescription( this.page )
    },
    featuredImage: function() {
      return setFeaturedImage( this.page )
    }
  }
  // beforeRouteUpdate( to, from, next ) {
  //   const pageArray = this.$store.state.pages
  //   const test = pageArray.map( ( object ) => { return object.slug })

  //   if ( test.indexOf( to.params.slug ) > -1 ) {
  //     next()
  //   } else {
  //     next({ name: '404', params: { '0': to.path } })
  //   }
  // }
}
</script>