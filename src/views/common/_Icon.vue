<template>
  <svg :class="'icon icon-' + name" :width="width" :height="height">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#i-' + name"></use>
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


