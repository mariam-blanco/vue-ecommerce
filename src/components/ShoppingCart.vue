<template>
  <ShoppingLayout>
    <!-- Header -------------------------------------------------->
    <template v-slot:header>
      <h6>
        Cart<span> ({{ numCartItems }})</span>
      </h6>
      <a class="link" @click="removeCartItems">Remove all</a>
    </template>

    <!-- Body: Shopping list ------------------------------------->
    <template v-slot:body>
      <ul class="shopping-list">
        <ShoppingItem
          v-for="(cartItem, index) in cartItems"
          :cart-item="cartItem"
          :key="index"
        >
          <ShoppingButtonQuantity class="item-quantity--small" />
        </ShoppingItem>
      </ul>
      <!-- Body: Summary table ------------------------------------->
      <ShoppingPricesTable />
    </template>

    <!-- Footer -------------------------------------------------->
    <template v-slot:footer>
      <router-link :to="{ name: 'Checkout' }">
        <BaseButton class="btn--primary btn--block" text="Checkout" />
      </router-link>
    </template>
  </ShoppingLayout>
</template>

<script>
import ShoppingItem from '@/components/ShoppingItem.vue'
import ShoppingPricesTable from '@/components/ShoppingPricesTable.vue'
import ShoppingLayout from '@/components/ShoppingLayout.vue'
import BaseButton from '@/components/BaseButton.vue'
import ShoppingButtonQuantity from '@/components/ShoppingButtonQuantity.vue'

export default {
  name: 'ShoppingCart',

  props: {
    title: String,
    isCart: Boolean,
  },

  components: {
    ShoppingItem,
    ShoppingPricesTable,
    ShoppingLayout,
    BaseButton,
    ShoppingButtonQuantity,
  },

  computed: {
    cartItems() {
      return this.$store.state.cart
    },

    numCartItems() {
      return this.cartItems.length
    },
  },

  methods: {
    removeCartItems() {
      this.$store.dispatch('removeAllCartItems')
    },
  },
}
</script>

<style lang="scss">
.cart {
  display: flex;
  flex-direction: column;
  row-gap: $sp-4;
  padding: $sp-4 28px;
  border-radius: $border-rd;

  &.cart--summary {
    width: 350px;

    @include media-query-tablet {
      width: 100%;
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

  &__list-items {
    display: flex;
    flex-direction: column;
    row-gap: $sp-3;
  }

  &__summary-table {
    color: $black-50;
    display: table;

    & > div {
      display: table-row;
    }

    & > div > div {
      display: table-cell;
    }

    .th {
      text-transform: uppercase;
    }

    .price {
      text-align: right;
    }
  }
}
</style>
