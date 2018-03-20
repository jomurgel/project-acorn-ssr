<template>
  <div class="pagination-group" v-if="maxPage > 1">
    <router-link v-if="currentPage > 1" :to="route + ( currentPage - 1 )">prev</router-link>

    <span> {{ currentPage }}/{{ maxPage }} </span>

    <router-link v-if="hasMore" :to="route + ( currentPage + 1 )">next</router-link>
  </div>
</template>

<script>
export default {
  props: {
    // Current Page
    currentPage: {
      type: Number,
      required: true
    },
    // Total number of pages
    maxPage: Number,
    // Check if page is less than max page.
    hasMore: Boolean
  },
  computed: {
    route: function() {
      if ( this.$store.state.active.archive === 'blog' ) {
        return '/blog/'
      } else {
        return '/cateogory/' + this.$store.state.active.archive + '/'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
