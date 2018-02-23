<template>
  <div class="posts">
    <transition name="fade" mode="out-in">
      <div class="post-list" :key="page" v-if="page > 0">
        <transition-group tag="ul" name="post">
          <li v-for="post in posts" :key="post.id" class="post">
            <h2>
              <router-link :to="'/blog/' + post.slug"> {{ post.title }}</router-link>
            </h2>
            <div v-html="post.excerpt"></div>
          </li>
        </transition-group>
      </div>
    </transition>
    <hr/>
    <pagination :current-page="page" :max-page="maxPage" :has-more="hasMore" />
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
    return store.dispatch( 'getPosts', parseInt( route.params.page ) || 1 )
  },
  computed: {
    ...mapGetters({
      posts: 'activePosts'
    }),
    page() {
      return parseInt( this.$route.params.page ) || 1
    },
    maxPage() {
      return Math.ceil( this.$store.state.postCount / this.$store.state.postsPerPage )
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
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
