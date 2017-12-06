<template>
  <footer class="site-footer">
    {{ siteName }} | Copyright {{ getYear }} by <a :href="authorURL">{{ authorName }}</a>.
  </footer>
</template>

<script>
import { TITLE, AUTHOR, AUTHOR_URL } from '@root/siteconfig'

export default {
  data() {
    return {
      siteName: TITLE,
      authorName: AUTHOR,
      authorURL: AUTHOR_URL
    }
  },
  computed: {
    getYear() {

      // Get get current year for copyright.
      let currentTime = new Date()
      let currentYear = currentTime.getFullYear()
      return currentYear
    }
  }
}
</script>

<style lang="scss" scoped>
.site-footer {
  border-top: 1px solid #efefef;
  margin-top: 50px;
  padding-top: 25px;
}
</style>
