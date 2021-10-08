<template>
  <div class="item-quantity">
    <button @click="decreaseQuantity">-</button>
    <span>{{ 1 }}</span>
    <button @click="increaseQuantity">+</button>
  </div>
</template>

<script>
export default {
  name: 'ShoppingButtonQuantity',
}
</script>

<style lang="scss">
.item-quantity {
  width: 120px;
  height: 48px;
  display: flex;
  align-items: center;
  background-color: $light-bg-100;

  & > * {
    flex: 1;
  }

  button {
    opacity: 0.25;
    font-weight: 700;

    &:focus {
      opacity: 1;
      color: $focus-primary-color;
      cursor: pointer;
    }
  }

  span {
    color: $black;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
  }

  &.item-quantity--small {
    width: 96px;
    height: 32px;
  }
}
</style>
