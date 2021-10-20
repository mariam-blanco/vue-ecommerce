<template>
  <ShoppingLayout>
    <!-- Header -------------------------------------------------->
    <template v-slot:header>
      <h6>
        Cart<span v-if="numCartItems > 0"> ({{ numCartItems }})</span>
      </h6>
      <a v-if="numCartItems > 0" class="link" @click="removeCartItems"
        >Remove all</a
      >
    </template>

    <!-- Body: Shopping list ------------------------------------->
    <template v-slot:body>
      <p class="shopping-message" v-if="numCartItems === 0">
        Your cart is empty
      </p>
      <ul v-if="numCartItems > 0" class="shopping-list">
        <ShoppingItem
          v-for="(cartItem, index) in cartItems"
          :cart-item="cartItem"
          type="cart"
          :key="index"
        />
      </ul>
      <!-- Body: Summary table ------------------------------------->
      <ShoppingPricesTable v-if="numCartItems > 0" type="cart" />
    </template>

    <!-- Footer -------------------------------------------------->
    <template v-slot:footer>
      <BaseButton
        @click="checkout"
        class="btn--primary btn--block"
        text="Checkout"
        :disabled="numCartItems === 0"
      />
    </template>
  </ShoppingLayout>
</template>

<script>
import ShoppingItem from '@/components/ShoppingItem.vue'
import ShoppingPricesTable from '@/components/ShoppingPricesTable.vue'
import ShoppingLayout from '@/components/ShoppingLayout.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'ShoppingCart',
  components: {
    ShoppingItem,
    ShoppingPricesTable,
    ShoppingLayout,
    BaseButton,
  },

  computed: {
    cartItems() {
      return this.$store.state.cart
    },

    numCartItems() {
      return this.$store.state.cartNumItems
    },
  },

  methods: {
    removeCartItems() {
      this.$store.dispatch('removeAllCartItems')
    },

    checkout() {
      this.$store.commit('SET_IS_OPEN', false)
      this.$router.push({ name: 'Checkout' })
    },
  },
}
</script>

<style lang="scss">
.shopping-message {
  text-align: center;
}
</style>
