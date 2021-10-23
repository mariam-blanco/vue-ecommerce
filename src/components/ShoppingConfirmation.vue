<template>
  <ShoppingLayout class="shopping-confirmation">
    <!-- Header -------------------------------------------------->
    <template v-slot:header>
      <div class="circle"></div>
      <h3>Thank you for your order</h3>
      <p>You will receive an email confirmation shortly.</p>
    </template>

    <!-- Body: Shopping list -------------------------------------->
    <template v-slot:body>
      <div class="shopping-wrapper">
        <ul class="shopping-list">
          <ShoppingItem
            v-for="(cartItem, index) in cartItems"
            :cart-item="cartItem"
            :key="index"
          >
          </ShoppingItem>
        </ul>
        <hr />
        <div class="show-more">
          <a>View less</a>
        </div>
      </div>
      <!-- Body: Price ------------------------------------------->
      <div class="shopping-price">
        <p class="title">Grand total</p>
        <p class="price">{{ grandTotal }}</p>
      </div>
    </template>

    <!-- Footer -------------------------------------------------->
    <template v-slot:footer>
      <BaseButton
        @click="goHome"
        class="btn--primary btn--block"
        text="Back to home"
      />
    </template>
  </ShoppingLayout>
</template>

<script>
import ShoppingItem from '@/components/ShoppingItem.vue'
import ShoppingLayout from '@/components/ShoppingLayout.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'ShoppingConfirmation',

  components: {
    ShoppingItem,
    ShoppingLayout,
    BaseButton,
  },

  computed: {
    cartItems() {
      return this.$store.state.cart
    },

    grandTotal() {
      return this.$store.getters.grandTotal
    },
  },
  methods: {
    /* The method 'replace' is similar to 'push' method but disables the
       browser back botton */
    goHome() {
      /* 1- Remove all items from client cart */
      this.$store.dispatch('removeAllCartItems')
      /* 2- Replaces current route with 'Home' route in the histoty of the browser */
      this.$router.replace({ name: 'Home' })
      /* 3- Close modal */
      this.$store.commit('SET_IS_OPEN', false)
    },
  },
}
</script>

<style lang="scss">
.shopping-confirmation {
  max-width: 540px;

  @include media-query-mobile {
    width: 100%;
    row-gap: $sp-3;
  }

  .shopping-layout__header {
    flex-direction: column;

    .circle {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: $primary-color;
      margin-bottom: $sp-4;

      @include media-query-mobile {
        margin-bottom: $sp-3;
      }
    }

    h3 {
      margin-bottom: $sp-3;

      @include media-query-mobile {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: $sp-2;
      }
    }
  }

  .shopping-layout__body {
    display: flex;
    flex-direction: row;
    gap: 0;
    border-radius: $border-rd;
    background-color: $light-bg-100;

    @include media-query-mobile {
      flex-direction: column;
    }

    .shopping-wrapper {
      flex: 1;
      padding: $sp-3 $sp-3 0;
      padding-bottom: 0;

      .shopping-list {
        width: 100%;
        margin-bottom: $sp-2;
      }

      hr {
        opacity: 0.1;
      }

      .show-more {
        height: 48px;
        text-align: center;
        padding-top: $sp-1;
        padding-bottom: $sp-3;

        a {
          font-size: 12px;
          font-weight: 700;
        }
      }
    }

    .shopping-item__image {
      width: 50px;
      height: 50px;
    }

    .shopping-price {
      width: 198px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: $sp-3;
      border-top-right-radius: $border-rd;
      border-bottom-right-radius: $border-rd;
      background-color: $black;
      color: $white;

      @include media-query-mobile {
        width: 100%;
      }

      .title {
        text-transform: uppercase;
        color: $white-50;
        margin-bottom: 8px;
      }

      .price {
        font-size: 18px;
      }

      @include media-query-mobile {
        height: 92px;
        padding: $sp-2 $sp-3;
        border-top-right-radius: 0;
        border-bottom-right-radius: $border-rd;
        border-bottom-left-radius: $border-rd;
      }
    }
  }
}
</style>
