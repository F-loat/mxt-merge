<template>
  <mxt-merge />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MxtMerge from './components/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    MxtMerge
  }
})
</script>

<style>
@font-face {
  font-family: ZpixReviewOnline;
  src: url(/zpix.woff2);
  font-display: swap;
}

html, body, pre, code, kbd, samp {
  font-family: "ZpixReviewOnline";
}
</style>
