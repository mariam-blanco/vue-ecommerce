<template>
  <div class="item-quantity">
    <button @click="decrease(btnQuantityType)">-</button>
    <span>{{ quantity }}</span>
    <button @click="increase(btnQuantityType)">+</button>
  </div>
</template>

<script>
/*
 ** There are 3 cases of use:
 ** Case 1: In Product page, when product has not been added to the cart
 ** Case 2: In the ShoppingCart component, product is in the cart and user changes the quantity.
 ** Case 3: In Product page, but the product has been already added to the cart.
 **
 ** There are to types of ShoppingButtonQuantity ('btn-quantity-type' prop):
 ** 1. 'productQuantity'
 ** 2. 'cartQuantity'
 */

export default {
  name: 'ShoppingButtonQuantity',
  props: ['id', 'btnQuantityType'],

  created() {
    /* Initializes 'initialQuantity' state in the store */
    if (this.btnQuantityType === 'productQuantity') {
      this.$store.dispatch('setInitialQuantity', this.id)
    }
  },

  computed: {
    itemFound() {
      return this.$store.getters.found(this.id)
    },

    quantity() {
      return this.btnQuantityType === 'productQuantity'
        ? this.$store.state.initialQuantity
        : this.itemFound.quantity
    },
  },

  methods: {
    increase(type) {
      const found = this.itemFound

      if (!found || (found && type === 'productQuantity')) {
        this.$store.commit('INCREASE_QUANTITY')
      } else if (found && type === 'cartQuantity') {
        this.$store.dispatch('increaseCartQuantity', this.id)
      }
    },

    decrease(type) {
      const found = this.itemFound
      // 'this.quantity > 1' avoid reduce quantity below 1
      if (this.quantity > 1) {
        if (!found || (found && type === 'productQuantity')) {
          this.$store.commit('DECREASE_QUANTITY')
        } else if (found && type === 'cartQuantity') {
          this.$store.dispatch('decreaseCartQuantity', this.id)
        }
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
