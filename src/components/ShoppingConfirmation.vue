<template>
  <ShoppingLayout class="shopping-confirmation">
    <!-- Header -------------------------------------------------->
    <template v-slot:header>
      <div class="circle">
        <img src="@/assets/shared/desktop/check.svg" />
      </div>
      <h3>Thank you for your order</h3>
      <p>You will receive an email confirmation shortly.</p>
    </template>

    <!-- Body: Shopping list -------------------------------------->
    <template v-slot:body>
      <div class="shopping-wrapper">
  
        <ul :class="['shopping-list', { 'show-first-item': isFirstShown }]"> 
          <ShoppingItem
            v-for="(item, index) in cartItems"
            :cart-item="item"
            type="summary"
            :key="index"
          />
        </ul>
        
       
        <div v-if="numCartItems > 1" class="show-more">
          <a @click="toggleShow()">
            {{ isFirstShown ? `and ${numCartItems - 1} other item(s)` : 'View less'}}
          </a>
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

  data() {
    return {
      isFirstShown: true
    }
  },

  computed: {

    cartItems() {
      return this.$store.state.cart
    },

    numCartItems() {
      return this.$store.getters.cartNumItems
    },

    grandTotal() {
      return this.$store.getters.grandTotal
    },

  },
  methods: {
    toggleShow() {
      this.isFirstShown = !this.isFirstShown
    },
    
    goHome() {
      // 1. Remove all items from cart 
      // 2. Replaces current route with 'Home' route in the histoty of the browser 
      // 3. Close modal 
      this.$store.dispatch('removeAllCartItems')
      this.$router.replace({ name: 'Home' })
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
      padding: 21px;


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
        
        &.show-first-item {
        
          li.shopping-item:nth-child(1n+2) {
            display: none
          }
        } 
      }

      

      .show-more {
        height: 48px;
        text-align: center;
        border-top: 1px solid hsla(0, 0, 59%, 0.1);
        padding-top: $sp-1;
        padding-bottom: $sp-3;

        a {
          cursor: pointer;
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
