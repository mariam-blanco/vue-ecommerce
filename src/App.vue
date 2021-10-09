<template>
  <div class="header-bg" :class="$route.path == '/' && 'header-bg--hero'"></div>
  <div class="container">
    <TheHeader />
    <main class="main">
      <BaseModal :class="`modal--${modalClass}`">
        <component :is="activeComponent" />
      </BaseModal>

      <router-view />
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
import BaseModal from '@/components/BaseModal.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import NavCategories from '@/components/NavCategories.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
    BaseNavBar,
    BaseModal,
    ShoppingCart,
    NavCategories,
  },

  created() {
    if (localStorage.cart) {
      const savedCartItems = JSON.parse(localStorage.getItem('cart'))
      const savedSummary = JSON.parse(localStorage.getItem('summary'))
      this.$store.commit('SET_CART', savedCartItems)
      this.$store.commit('SET_TOTAL', localStorage.getItem('total'))
      this.$store.commit('SET_TAX', savedSummary.tax)
      this.$store.commit('SET_GRAND_TOTAL', savedSummary.grandTotal)
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },

    activeComponent() {
      return this.$store.state.activeModalComponent
    },

    // prettier-ignore
    modalClass() {
      return this.activeComponent === 'ShoppingCart' && 'cart' || 
             this.activeComponent === 'NavCategories' && 'navigation' || 
             this.activeComponent === 'ShoppingConfirmation' && 'confirmation' 
    },

    isOpen() {
      return this.$store.state.isOpen
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/resets.scss';
@import '@/styles/typography.scss';

#app {
  position: relative; /* Para posicionar de manera obsoluta el fondo oscuro del header y del footer */
  width: 100vw;
  @include flex-column(center);
  @include margin-or-padding-responsive(padding, 0 24px, 0 40px, 0);

  /* -------- Background -------- */

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

    &.header-bg--hero {
      @include width-or-height-responsive(height, 730px, 730px, 600px);
      @include back-image-responsive('./assets/home', 'image-header.jpg');
      background-size: auto 100%;
      background-position: center;
      background-repeat: no-repeat;

      @include media-query-tablet {
        background-size: cover;
      }

      @include media-query-mobile {
        background-position: right 50% bottom 0px;
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

.container {
  width: 100%;
  max-width: 1110px;
  min-height: 100vh;
  @include flex-column();

  @include media-query-mobile {
    padding: 0 24px;
  }

  .main {
    width: 100%;

  .page {
    width: 100%;
    display: flex;
    flex-direction: column;
    @include gap-responsive(row-gap, 160px, 120px, 120px);
    @include margin-or-padding-responsive(padding-bottom, 160px, 120px, 120px);

    &.page--home {
      @include gap-responsive(gap, 200px, 96px, 120px);
      @include margin-or-padding-responsive(padding-bottom, 200px, 96px, 120px);
    }
  }
}


}

</style>
