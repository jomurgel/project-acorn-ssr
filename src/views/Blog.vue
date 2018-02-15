<template>
  <div class="posts">
    <div class="news-list-nav">
      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">< prev</router-link>
      <a v-else class="disabled">< prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more ></router-link>
      <a v-else class="disabled">more ></a>
    </div>
    <hr/>
    <div v-for="post in posts" :key="post.id" class="post">
      <h2>
        <router-link :to="{ path: 'blog/' + post.slug }"> {{ post.title }}</router-link>
      </h2>
      <div v-html="post.excerpt"></div>
    </div>
    <!-- <ul class="pagination">
      <li v-for="n in totalPages" :key="n">
        <router-link :to="{ name: 'blog', query: { page: n } }">
          {{ n }}
        </router-link>
      </li>
    </ul> -->
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
