<template>

  <div class="page">
    <div class="hero-title">
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
        <router-link :to="{ name: 'Product', params: { slug: product.slug } }">
          <BaseButton class="btn--primary" />
        </router-link>
      </BaseCard>
    </section>
    <NavCategories />
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import NavCategories from '@/components/NavCategories.vue'
import { watchEffect } from 'vue'

export default {
  name: 'Category',
  props: ['category'],
  components: {
    BaseCard,
    BaseButton,
    NavCategories,
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
}
</script>

<style lang="scss">
.product-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  @include gap-responsive(row-gap, 160px, 120px, 120px);
}

.hero-title {
  @include width-or-height-responsive(height, 240px, 240px, 100px);
  @include flex-box-position(center, center);
  border-top: 1px solid $border-color;
  color: $white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    @include hero-title-height-responsive();
    z-index: -10;
    display: block;
    background-color: $dark-bg;
  }
}
</style>
