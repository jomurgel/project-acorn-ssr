<template>
  <section class="single-post">
    <h1>
      {{ post.title }}
    </h1>
    <div v-html="post.content"></div>
  </section>
</template>

<script>

export default {
  props: {
    post: Object
  }
}
</script>
