<template>
  <header class="header" :class="$route.path == '/' && 'header--home'">
    <a
      @click="toogleModal('NavCategories')"
      class="header__mini-nav header-icon"
    >
      <BaseIcon icon-name="icon-hamburger" :width="16" :height="15" />
    </a>
    <div class="header__logo">
      <router-link to="/">
        <img src="@/assets/shared/desktop/logo.svg" alt="audiophile" />
      </router-link>
    </div>

    <BaseNavBar class="header__nav" />

    <div class="header__cart">
      <span v-if="numCartItems > 0" class="cart-num-items">{{
        numCartItems
      }}</span>
      <a class="header-icon" @click="toogleModal('ShoppingCart')">
        <BaseIcon
          class="header-icon"
          icon-name="icon-cart"
          :width="23"
          :height="20"
        />
      </a>
    </div>
  </header>
</template>

<script>
import BaseNavBar from '@/components/BaseNavBar.vue'
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'AppHeader',
  components: {
    BaseIcon,
    BaseNavBar,
  },

  computed: {
    numCartItems() {
      return this.$store.getters.cartNumItems
    },
  },

  methods: {
    toogleModal(component) {
      this.$store.dispatch('openModalComponent', component)
      this.$store.commit('SET_IS_OPEN', !this.$store.state.isOpen)
    },
  },
}
</script>

<style lang="scss">
.header {
  width: 100%;

  @include header-height-responsive();
  @include flex-box-position(space-between, center);

  .header-icon {
    svg {
      fill: $white;
    }
  }

  &__logo {
    @include media-query-tablet {
      flex: 1;
    }

    @include media-query-mobile {
      flex: 0;
    }
  }

  &__mini-nav {
    display: none;

    @include media-query-tablet {
      display: inherit;
      margin-right: 42px;
    }

    @include media-query-mobile {
      margin-right: 0;
    }
  }

  &__nav {
    @include media-query-tablet {
      display: none;
    }
  }

  &__cart {
    a:hover {
      cursor: pointer;

      svg {
        fill: $primary-color;
      }
    }

    .cart-num-items {
      display: inline-block;
      position: relative;
      left: 5px;
      bottom: 24px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: $primary-color;
      text-align: center;
      padding: 4px;
      color: $white;
      font-weight: 500;
      line-height: 12px;
      font-size: 12px;
    }
  }
}
</style>
