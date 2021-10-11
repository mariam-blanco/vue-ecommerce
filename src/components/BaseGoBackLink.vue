<template>
  <div class="go-back">Go back</div>
</template>

<script>
export default {
  name: 'BaseGoBackLink',
}
</script>

<style lang="scss">
.go-back {
  position: absolute;
  @include position-responsive(top, 80px+97px, 34px+90px, 16px+90px);
}
</style>
