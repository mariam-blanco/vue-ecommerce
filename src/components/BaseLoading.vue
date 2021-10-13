<template>
  <div class="loading">
    <h1>Loading...</h1>
  </div>
</template>

<script>
export default {
  name: 'BaseLoading',
}
</script>

<style lang="scss">
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
