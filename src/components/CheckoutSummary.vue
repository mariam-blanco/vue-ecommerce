<template>
  <ShoppingLayout class="shopping--summary">
    <!-- Header -------------------------------------------------->
    <template v-slot:header>
      <h6>Summary</h6>
    </template>

    <!-- Body: Shopping list ------------------------------------->
    <template v-slot:body>
      <ul class="shopping-list">
        <ShoppingItem
          v-for="(cartItem, index) in cartItems"
          :cart-item="cartItem"
          type="summary"
          :key="index"
        />
      </ul>
      <!-- Body: Summary table ------------------------------------->
      <ShoppingPricesTable type="summary" />
    </template>

    <!-- Footer -------------------------------------------------->
    <template v-slot:footer>
      <BaseButton
        @click="confirmShopping"
        class="btn--primary btn--block"
        text="Continue & pay"
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
  name: 'CheckoutSummary',

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
  },
  methods: {
    confirmShopping() {
      // 1.- confirm form is filled & send the information

      // 2.- open 'ShoppingConfirmation' component. Once the modal is open
      // it shoudn't get closed
      this.$store.dispatch('openModalComponent', 'ShoppingConfirmation')
      this.$store.commit('SET_IS_OPEN', true)
    },
  },
}
</script>

<style lang="scss">
.shopping--summary {
  background-color: $white;
}
</style>
