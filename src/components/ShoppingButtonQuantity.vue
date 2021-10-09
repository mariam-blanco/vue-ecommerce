<template>
  <div class="item-quantity">
    <button @click="decreaseQuantity()">-</button>
    <span>{{ cartQuantity }}</span>
    <button @click="increaseQuantity()">+</button>
  </div>
</template>

<script>
export default {
  name: 'ShoppingButtonQuantity',
  props: ['id'],
  data() {
    return {
      initialQuantity: 1,
    }
  },

  computed: {
    itemFound() {
      return this.$store.state.cart.find((item) => item.id === this.id)
    },

    cartQuantity() {
      return this.itemFound ? this.itemFound.quantity : this.initialQuantity
      //return this.$store.state.initialQuantity
    },
  },
  methods: {
    increaseQuantity() {
      this.itemFound
        ? this.$store.dispatch('increaseCartQuantity', this.id)
        : this.initialQuantity++
    },

    decreaseQuantity() {
      if (this.itemFound && this.itemFound.quantity > 0) {
        this.$store.dispatch('decreaseCartQuantity', this.id)
      } else if (this.initialQuantity > 0) {
        this.initialQuantity--
      }
    },
  },
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
