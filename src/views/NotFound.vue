<template>
  <div class="page-error notFound">
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <router-link :to="{ name: 'Home' }">
      <BaseButton class="btn--primary" text="Back to home" />
    </router-link>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
export default {
  name: 'NotFound',
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page',
    },
  },
  components: {
    BaseButton,
  },
}
</script>
<style lang="scss"></style>
