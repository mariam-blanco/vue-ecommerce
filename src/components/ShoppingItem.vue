<template>
  <li class="shopping-item">
    <div class="shopping-item__image">
      <img
        :src="require(`@/assets/cart/image-${cartItem.image}`)"
        :alt="cartItem.name"
      />
    </div>
    <div class="shopping-item__content">
      <h6>{{ cartItem.shortName }}</h6>
      <p class="price">{{ cartItem.price }}</p>
    </div>
    <div class="shopping-item__quantity">
      <p>x{{ cartItem.quantity }}</p>
      <slot />
    </div>
  </li>
</template>

<script>
export default {
  name: 'ShoppingItem',
  props: {
    cartItem: Object,
    isCart: Boolean,
  },
}
</script>

<style lang="scss">
.shopping-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 16px;

  &__image {
    //flex: 0;
    width: $sp-8;
    height: $sp-8;
    background-color: $light-bg-100;
    border-radius: $border-rd;

    img {
      width: 100%;
      height: auto;
      border-radius: $border-rd;
    }
  }

  &__content {
    flex: 1;

    h6 {
      font-size: 15px;
    }

    p {
      font-size: 14px;
    }
  }

  &__quantity {
    width: auto;
    align-self: flex-start;

    p {
      font-weight: 700;
    }
  }
}
</style>
