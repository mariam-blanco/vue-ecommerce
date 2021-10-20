<template>
  <div class="page-error network-error">
    <h3>It looks like you're experiencing some network issues.</h3>

    <BaseButton @click="$router.go(-1)" class="btn--primary" text="Try again" />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
export default {
  name: 'NetworkError',

  components: {
    BaseButton,
  },
}
</script>
<style lang="scss"></style>
