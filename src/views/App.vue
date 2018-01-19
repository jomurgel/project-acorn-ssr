<template>
  <div id="app">
    <div class="container">
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
import themeHeader from './components/Header'
import themeFooter from './components/Footer'
export default {
  components: {
    themeHeader,
    themeFooter
  }
}
</script>

<style lang="scss" global>

// Import global styles.
@import './assets/scss/styles.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
