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
      card: 'https://placehold.it/1280x768/f60/fff?text=HPOSTS'
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
  },
  beforeRouteEnter( to, from, next ) {
    next( vm => {

      // If we're a category.
      if ( to.params.type !== 'blog' ) {
        // Make sure we have a valid category.
        const hasZeroCount = vm.$store.state.taxonomy.categories.filter( ( category ) => {
          return category.slug === to.params.type
        })[0].count === 0

        // If we don't have a valid category, 404.
        if ( hasZeroCount ) {
          next({ name: '404', params: { error: '404' } })
        }
      }

      // Async to fix moving between routes where same component is used. Blog to Category for example.
      const { asyncData } = vm.$options
      asyncData({
        store: vm.$store,
        route: to
      }).then( next ).catch( next )
    })
  }
}
</script>

<style lang="scss" scoped>
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  // Switching routes, loading new getter posts transition.
  .post-leave-to {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }

  .post-enter,
  .post-leave {
    transition: opacity 0.3s, margin-top 0.3s ease-in-out;
  }

  .post-enter,
  .post-enter-active {
    animation: fadein 0.5s;
  }

  .post-leave,
  .post-leave-active {
    animation: fadeout 0.5s;
  }

  @keyframes fadein {
      0% {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
      }
      100% {
          opacity: 1;
          max-height: auto;
      }
  }

  @keyframes fadeout {
      0% {
          opacity: 1;
          max-height: auto;
          margin-top: -15px;
      }
      100% {
          max-height: 0;
          opacity: 0;
          margin-top: 0;
          overflow: hidden;
      }
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
