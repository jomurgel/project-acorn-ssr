<template>
  <li class="post">
    <h2>
       <router-link :to="{ name: 'single', params: { slug: post.slug } }"> {{ post.title }}</router-link>
    </h2>
    <div v-html="post.excerpt"></div>
  </li>
</template>

<script>

export default {
  props: {
    post: Object
  }
}
</script>
