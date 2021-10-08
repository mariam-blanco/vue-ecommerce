<template>
  <ShoppingLayout>
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
          :key="index"
        >
          <p>{{ cartItem.quantity }}</p>
        </ShoppingItem>
      </ul>
      <!-- Body: Summary table ------------------------------------->
      <ShoppingPricesTable />
    </template>

    <!-- Footer -------------------------------------------------->
    <template v-slot:footer>
      <BaseButton class="btn--primary btn--block" text="Continue" />
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
}
</script>

<style lang="scss">
.cart--summary {
  width: 350px;

  @include media-query-tablet {
    width: 100%;
  }
}
</style>
