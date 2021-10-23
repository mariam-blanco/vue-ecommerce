<template>
  <div class="page-error network-error">
    <h3 class="loading-h3">Loading...</h3>

    <BaseButton @click="$router.go(-1)" class="btn--primary" text="Try again" />
  </div>
</template>

<script>
export default {
  name: 'BaseLoading',
}
</script>

<style lang="scss">
.loading-h3 {
  margin-top: -600px;
}
.loading {
  height: 200px;
  background-color: yellow;
  @include center-flex();

  p {
    color: $black;
    text-align: center;
  }
}
</style>
