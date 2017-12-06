<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import { TITLE } from '@root/siteconfig'

export default {
  data() {
    return {
      title: TITLE
    }
  },
  meta() {
    const meta = {
      title: TITLE,
      description: 'Description for home',
      card: 'http://placehold.it/1280x768/f60/fff?text=HOME'
    }
    return meta
  }
}
</script>
