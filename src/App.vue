<template>
  <div class="header-bg" :class="$route.path == '/' && 'header-bg--hero'"></div>
  <div class="container">
    <TheHeader />
    <main :class="`main main--${$route.name.toLowerCase()}`">
      <router-view />
      <NavCategories
        v-if="$route.path !== '/checkout'"
        :class="$route.path === '/' && 'change-order'"
      />
      <SectionAbout v-if="$route.path !== '/checkout'" />

      <!-- Modal ------------------------------------------->
      <transition name="fade">
        <BaseModal v-if="isOpen" :class="`modal--${modalClass}`">
          <component :is="activeComponent" />
        </BaseModal>
      </transition>

      <!---------------------------------------- end Modal-->
    </main>
    <TheFooter>
      <BaseNavBar />
    </TheFooter>
  </div>
  <div class="footer-bg"></div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import BaseNavBar from '@/components/BaseNavBar.vue'
import SectionAbout from '@/components/SectionAbout.vue'
import BaseModal from '@/components/BaseModal.vue'
// Components inside the modal: ShoppingCart, NavCategories, ShoppingConfirmation
import ShoppingCart from '@/components/ShoppingCart.vue'
import NavCategories from '@/components/NavCategories.vue'
import ShoppingConfirmation from '@/components/ShoppingConfirmation.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
    BaseNavBar,
    SectionAbout,
    BaseModal,
    ShoppingCart,
    NavCategories,
    ShoppingConfirmation,
  },

  created() {
    if (localStorage.cart) {
      const savedCartItems = JSON.parse(localStorage.getItem('cart'))
      const savedSummary = JSON.parse(localStorage.getItem('summary'))
      this.$store.commit('SET_CART', savedCartItems)
      this.$store.commit('SET_TOTAL', localStorage.getItem('total'))
      this.$store.commit('SET_TAX', savedSummary.tax)
      this.$store.commit('SET_GRAND_TOTAL', savedSummary.grandTotal)
      this.$store.commit('SET_CART_NUM_ITEMS')
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },

    activeComponent() {
      return this.$store.state.activeModalComponent
    },

    isOpen() {
      return this.$store.state.isOpen
    },

    // prettier-ignore
    modalClass() {
      return this.activeComponent === 'ShoppingCart' && 'cart' || 
             this.activeComponent === 'NavCategories' && 'navigation' || 
             this.activeComponent === 'ShoppingConfirmation' && 'confirmation' 
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/resets.scss';
@import '@/styles/typography.scss';

#app {
  position: relative; /* Para posicionar de manera obsoluta el fondo oscuro del header y del footer */
  width: 100%;
  @include flex-column();
  /* prettier-ignore */
  @include margin-or-padding-responsive(
    padding, 
    0 40px, 0 24px, 0);

  .container {
    width: 100%;
    max-width: 1110px;
    min-height: 100vh;
    @include flex-column($align-i: center);

    @include media-query-mobile {
      padding: 0 24px;
    }
  }

  // Base Layout
  .main,
  .main .product,
  .main .product-list {
    @include layout-default();
  }

  .main {
    /* prettier-ignore */
    @include margin-or-padding-responsive(
      padding-bottom, 
      160px, 120px, 120px);

    /* prettier-ignore */
    &.main--home {
      /* 'main' has top margin equal to the height of the 'header' to fix the 'position: fixed'@at-root
          Home page has 'position: relative', so this extra margin has to be removed */
      margin-top: 0;
      
      @include gap-responsive(
        gap, 
        160px, 96px, 120px);
      
      @include margin-or-padding-responsive(
        padding-bottom, 
        200px, 96px, 120px);
    }

    &.main--categories {
      .product-list {
        /* prettier-ignore */
        @include margin-or-padding-responsive(
            padding-top, 
            160px, 82px, 64px);
      }
    }

    &.main--product {
      /* prettier-ignore */
      @include margin-or-padding-responsive(
        padding-top, 
        160px, 82px, 64px);
    }

    &.main--checkout {
      flex-direction: row;
      align-items: flex-start;
      gap: 32px;
      /* prettier-ignore */
      @include margin-or-padding-responsive(
      padding-top, 
      142px, 96px, 64px);

      @include media-query-tablet {
        flex-direction: column;
        justify-content: stretch;
      }
    }
  }

  .page-error {
    width: 100%;
    height: 580px;
    @include center-flex(center);
    flex-direction: column;

    h3 {
      text-align: center;
      margin-bottom: $sp-4;
    }

    @include media-query-mobile {
      height: 420px;
    }
  }

  // Header & Footer Background
  // Hero Background (home)

  .header-bg,
  .footer-bg {
    background-color: $dark-bg;
    position: absolute;
    z-index: -10;
    width: 100%;
  }

  .header-bg {
    top: 0;
    @include header-height-responsive();

    /* prettier-ignore */
    &.header-bg--hero {
      @include width-or-height-responsive(
        height, 
        730px, 724px, 600px);
      @include back-image-responsive(
        './assets/home', 'image-header.jpg');
      background-size: auto 100%;
      background-position: center;
      background-repeat: no-repeat;

      @include media-query-tablet {
        background-size: cover;
      }

      @include media-query-mobile {
        //background-position: right 50% bottom 0px;
      }

      &::before {
        content: '';
        background-color: rgba(0, 0, 0, 0.3);
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }

  .footer-bg {
    bottom: 0;
    @include footer-height-responsive();
  }
}

.fade {
  &-enter-active {
    transition: opacity 0.25s ease-out;
  }

  &-leave-active {
    transition: opacity 0.2s ease-in;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  /* This in unnecessary, as it's default:
  **  &-enter-to, &-leave-from { opacity: 1; }  
  */
}
</style>
