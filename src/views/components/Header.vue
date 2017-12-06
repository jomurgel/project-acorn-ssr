<template>
  <header class="site-header">
    <navigation location="main" />
  </header>
</template>

<script>
import navigation from './Navigation'

export default {
  components: {
    navigation
  }
}
</script>

<style lang="scss" scoped>
.site-header {
	border-bottom: 1px solid #efefef;
	margin-bottom: 50px;
	padding: 50px 0 25px;
}
</style>
