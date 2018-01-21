<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import { TITLE } from '@root/webconfig'

export default {
  data() {
    return {
      title: TITLE
    }
  },
  meta() {
    const meta = {
      title: 'Home',
      description: 'Description for Home',
      card: 'https://placehold.it/1280x768/f60/fff?text=HOME'
    }
    return meta
  }
}
</script>
