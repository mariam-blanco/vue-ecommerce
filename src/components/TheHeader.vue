<template>
  <header class="header">
    <a
      @click="openModal('NavCategories')"
      class="header__icon header__icon--menu"
    >
      <BaseIcon icon-name="icon-hamburger" :width="16" :height="15" />
    </a>
    <div class="header__logo">
      <router-link to="/">
        <img src="@/assets/shared/desktop/logo.svg" alt="audiophile" />
      </router-link>
    </div>

    <BaseNavBar class="header__nav" />

    <a
      class="header__icon header__icon--cart"
      @click="openModal('ShoppingCart')"
    >
      <BaseIcon icon-name="icon-cart" :width="23" :height="20" />
    </a>
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

  methods: {
    openModal(component) {
      this.$store.dispatch('openModalComponent', component)
      this.$store.commit('SET_IS_OPEN', !this.$store.state.isOpen)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  @include header-height-responsive();
  @include flex-box-position(space-between, center);

  &__logo {
    @include media-query-tablet {
      flex: 1;
    }

    @include media-query-mobile {
      flex: 0;
    }
  }

  &__nav {
    @include media-query-tablet {
      display: none;
    }
  }

  &__icon {
    svg {
      fill: $white;
    }

    &.header__icon--menu {
      display: none;

      @include media-query-tablet {
        display: inherit;
        margin-right: 42px;
      }

      @include media-query-mobile {
        margin-right: 0;
      }
    }

    &.header__icon--cart {
      &:hover {
        cursor: pointer;

        svg {
          fill: $primary-color;
        }
      }
    }
  }
}
</style>
