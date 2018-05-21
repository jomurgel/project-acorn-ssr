<template>
  <div v-if="posts" class="posts">
    <pagination :current-page="page" :max-page="maxPage" :has-more="hasMore" :route-name="$route.params.slug || 'blog'" />
    <hr/>
    <transition name="fade" mode="out-in">
      <div class="post-list" :key="page" v-if="page > 0">
        <transition-group tag="ul" name="post" :key="page.id">
          <postItem v-for="post in posts" :key="post.id" :post="post" />
        </transition-group>
      </div>
    </transition>
  </div>
  <div v-else><!-- 404 Handler --></div>
</template>

<script>
import { mapGetters } from 'vuex'
import pagination from './components/Pagination'
import postItem from './components/Post-Item'

export default {
  components: {
    pagination,
    postItem
  },
  meta() {
    const meta = {
      title: 'Posts',
      description: 'Description for Posts',
      card: 'https://placehold.it/1280x768/f60/fff?text=CATEGORY'
    }
    return meta
  },
  asyncData({ store, route }) {
    const payload = { type: route.params.type || 'blog', count: parseInt( route.params.page ) || 1 }

    return store.dispatch( 'getPosts', payload )
  },
  computed: {
    ...mapGetters({
      posts: 'activePosts'
    }),
    page() {
      return parseInt( this.$route.params.page ) || 1
    },
    maxPage() {
      return Math.ceil( this.$store.state.archives[this.$store.state.active.archive].postCount / this.$store.state.postsPerPage )
    },
    hasMore() {
      return this.page < this.maxPage
    }
  }
}
</script>

<style lang="scss" scoped>
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  // Pagination transitions.
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
