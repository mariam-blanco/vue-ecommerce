<template>
  <div class="nav-cards-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NavCardsLayout',
}
</script>

<style lang="scss">
.nav-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  @include gap-responsive(gap, 30px, 10px, $sp-3);

  @include media-query-mobile {
    grid-template-columns: 1fr;
  }
}
.other-products .nav-cards-container {
  @include media-query-mobile {
    gap: $sp-7;
  }
}
</style>
