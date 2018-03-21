<template>
  <div class="posts">
    <pagination :current-page="page" :max-page="maxPage" :has-more="hasMore" :route-name="$route.params.slug || 'blog'" />
    <hr/>
    <transition name="fade" mode="out-in">
      <div class="post-list" :key="page" v-if="page > 0">
        <transition-group
          tag="ul"
          name="post"
          :key="page.id"
        >
          <li v-for="post in posts" :key="post.id" class="post">
            <h2>
              <router-link :to="{ name: 'archive', params: { slug: post.slug } }"> {{ post.title }}</router-link>
            </h2>
            <div v-html="post.excerpt"></div>
          </li>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pagination from './components/Pagination'

export default {
  components: {
    pagination
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

  .post-list {
    position: relative;
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
      50% {
          opacity: 0.5;
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
      50% {
          opacity: 0.5;
      }
      100% {
          max-height: 0;
          opacity: 0;
          margin-top: 0;
          overflow: hidden;
      }
  }

  .fade-enter-active,
  .fade-leave-active,
  .post-leave,
  .post-enter {
    transition: opacity 0.3s, margin-top 0.3s ease-in-out;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
