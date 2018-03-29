<template>
  <article class="single-post">
    <h1>
      {{ post.title }}
    </h1>
    <div v-html="post.content"></div>
  </article>
</template>

<script>

export default {
  props: {
    post: Object
  }
}
</script>
