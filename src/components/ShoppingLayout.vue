<template>
  <div class="shopping-layout">
    <!-- Header -------------------------------------------------->
    <div class="shopping-layout__header">
      <slot name="header"></slot>
    </div>

    <!-- Body ---------------------------------------------------->

    <div class="shopping-layout__body">
      <slot name="body"></slot>
    </div>

    <!-- Footer -------------------------------------------------->
    <div class="shopping-layout__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingLayout',
}
</script>

<style lang="scss">
.shopping-layout {
  min-height: 280px;
  @include flex-column($align-i: stretch);
  row-gap: $sp-4;
  padding: $sp-4 28px;
  border-radius: $border-rd;

  &.shopping--summary {
    width: 350px;

    @include media-query-tablet {
      width: 100%;
    }

    @include media-query-mobile {
      padding: 32px 24px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;

    .link {
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: $primary-color;
      }
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    row-gap: $sp-4;

    .shopping-list {
      display: flex;
      flex-direction: column;
      row-gap: $sp-3;
    }
  }
}
</style>
