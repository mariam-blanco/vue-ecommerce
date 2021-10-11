<template>
  <div class="go-back">
    <a @click="goBack">Go Back</a>
  </div>
</template>

<script>
export default {
  name: 'BaseGoBackLink',
  methods: {
    goBack() {
      this.$router.go(-1)
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="scss">
.go-back {
  position: absolute;
  @include position-responsive(top, 80px+97px, 34px+90px, 16px+90px);

  a {
    cursor: pointer;
    &:hover {
      color: $focus-primary-color;
    }
  }
}
</style>
