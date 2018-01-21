<template>
  <div id="app">
    <noscript>Javascript is not enabled. Please enable javascript in order to view this website.</noscript>
    <div class="container" v-show="loaded">
      <themeHeader />
      <transition name="fade" mode="out-in">
        <router-view class="view" />
      </transition>
      <themeFooter />
    </div>
  </div>
</template>

<script>
import themeHeader from '@src/views/components/Header'
import themeFooter from '@src/views/components/Footer'

export default {
  data() {
    return {
      loaded: false
    }
  },
  components: {
    themeHeader,
    themeFooter
  },
  methods: {
    isLoaded: function() {
      this.loaded = true
      return this.loaded
    }
  },
  beforeMount() {
    this.isLoaded()
  }
}
</script>

<style lang="scss" global>

// Import global styles.
@import '~styles';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
