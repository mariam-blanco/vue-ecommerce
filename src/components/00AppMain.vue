<template>
  <main class="page-main">
    <slot />

    <AppModal>
      <component :is="activeModalComponent" />
    </AppModal>
  </main>
</template>

<script>
import AppModal from '@/components/AppModal.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import NavCategoriesCards from '@/components/NavCategoriesCards.vue'

export default {
  name: 'AppMain',
  components: {
    AppModal,
    ShoppingCart,
    NavCategoriesCards,
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },

    activeModalComponent() {
      return this.$store.state.activeModalComponent
    },

    //modalClassModifier() {
    //  if (this.activeModalComponent === 'ShoppingCart') {
    //    return 'modal--right modal--cart'
    //  } else if (this.activeModalComponent === 'NavCategories') {
    //    return 'modal--navigation'
    //  }
    //  return ''
    //},

    isOpen() {
      return this.$store.state.isOpen
    },
  },
}
</script>

<style lang="scss">
.page-main,
.page-main .section.product-list,
.page-main .section.product {
  width: 100%;
  display: flex;
  flex-direction: column;
  @include gap-responsive(row-gap, 160px, 120px, 120px);
}

.page-main {
  @include margin-or-padding-responsive(padding-bottom, 160px, 120px, 120px);

  &.page-main--home {
    @include gap-responsive(gap, 200px, 96px, 120px);
    @include margin-or-padding-responsive(padding-bottom, 200px, 96px, 120px);
  }
}
</style>
