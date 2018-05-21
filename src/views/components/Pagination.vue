<template>
  <div class="pagination-group" v-if="maxPage > 1">
    <router-link v-if="currentPage > 1" :to="{ name: route, params: { type: $store.state.active.archive, page: ( currentPage - 1 ) } }">prev</router-link>

    <span> {{ currentPage }}/{{ maxPage }} </span>

    <router-link v-if="hasMore" :to="{ name: route, params: { type: $store.state.active.archive, page: ( currentPage + 1 ) } }">next</router-link>
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
      if ( this.$store.state.active.archive === 'post' ) {
        return 'posts'
      } else {
        return 'category'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
