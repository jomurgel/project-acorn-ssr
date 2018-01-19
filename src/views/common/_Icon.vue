<template>
  <svg :class="'icon icon-' + name" :width="width" :height="height">
    <title>{{ name.charAt( 0 ).toUpperCase() + name.slice( 1 ) }}</title>
    <use xmlns:xlink="https://www.w3.org/1999/xlink" :xlink:href="'#i-' + name"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    }
  }
}
</script>


