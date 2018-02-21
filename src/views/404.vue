<template>
  <div>
    <h1>{{ title }}</h1>
    <p>
      Looks like the thing you're looking for isn't here.  Why not <router-link :to="{ path: '/' }">go home</router-link>?
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '404'
    }
  },
  meta() {
    const meta = {
      title: this.title,
      description: 'Description for 404',
      card: 'https://placehold.it/1280x768/f60/fff?text=404',
      statusCode: 404
    }
    return meta
  }
}
</script>
