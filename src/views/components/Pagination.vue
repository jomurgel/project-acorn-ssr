<template>
  <div class="pagination-group">
    <router-link v-if="currentPage > 1" :to="'/blog/' + ( currentPage - 1 )">prev</router-link>

    <span> {{ currentPage }}/{{ maxPage }} </span>

    <router-link v-if="hasMore" :to="'/blog/' + ( currentPage + 1 )">next</router-link>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
