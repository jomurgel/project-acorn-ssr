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
import { POSTS_PER_PAGE } from '@root/webconfig'

export default {
  data() {
    return {
      transition: 'slide-right',
      displayedPage: Number( this.$route.params.page ) || 1,
      displayedItems: this.$store.getters.posts,
      type: 'blog'
    }
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
    console.log( '1' )
    return store.dispatch( 'getPosts', route.query['page'] || 1 )
  },
  computed: {
    page() {
      return Number( this.$route.params.page ) || 1
    },
    maxPage() {
      return Math.ceil( this.$store.state.postCount / POSTS_PER_PAGE )
    },
    hasMore() {
      return this.page < this.maxPage
    },
    posts() {
      return this.displayedItems.filter( e => e.pageNumber === this.displayedPage )
    }
  },
  beforeMount() {
    if ( this.$root._isMounted ) {
      console.log( '2' )
      this.loadItems( this.page || 1 )
    }
  },
  watch: {
    page( to, from ) {
      console.log( '3' )
      this.loadItems( to, from )
    }
  },
  methods: {
    loadItems( to = this.page, from = -1, next ) {

      this.$store.dispatch( 'getPosts', this.page ).then( () => {

        if ( this.page < 0 || this.page > this.maxPage ) {
          this.$router.replace( `/${this.type}/1` )
          return
        }

        this.displayedPage = to
        this.displayedItems = this.$store.getters.posts
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
