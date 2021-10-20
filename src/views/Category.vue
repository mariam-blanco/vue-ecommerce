<template>
  <div v-if="products" class="hero-title">
    <h1 class="text-white">{{ category }}</h1>
  </div>

  <section class="section product-list">
    <BaseCard
      v-for="(product, index) in products"
      class="card--product-by-category"
      :class="index === 0 || (index % 2 && 'card--reverse')"
      :name="product.name"
      :description="product.description"
      :image="product.image"
      :isNew="product.new"
      :key="product.id"
      has-heading2
    >
      <BaseButton @click="goToProduct(product.slug)" class="btn--primary" />
    </BaseCard>
  </section>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'

import { watchEffect } from 'vue'

export default {
  name: 'Category',
  props: ['category'],
  components: {
    BaseCard,
    BaseButton,
  },

  created() {
    watchEffect(() => {
      this.$store.dispatch('fetchProducts', this.category)
    })
  },

  computed: {
    products() {
      return this.$store.state.products
    },
    isLoading() {
      return this.$store.state.loading
    },
  },

  methods: {
    goToProduct(productSlug) {
      this.$router.push({
        name: 'Product',
        params: { slug: productSlug },
      })
    },
  },
}
</script>

<style lang="scss">
.hero-title {
  /* prettier-ignore */
  @include width-or-height-responsive(
    height, 
    240px, 240px, 100px);
  @include flex-box-position(center, center);
  border-top: 1px solid $border-color;
  color: $white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100vw;
    z-index: -10;
    display: block;
    background-color: $dark-bg;
    @include hero-title-height-responsive();
  }
}
</style>
