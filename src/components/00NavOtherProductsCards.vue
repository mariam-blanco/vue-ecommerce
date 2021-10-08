<template>
  <section class="section other-products">
    <h3>You may also like</h3>
    <NavCardsLayout>
      <NavCard
        class="nav-card--others"
        v-for="otherProduct in otherProducts"
        :nav-item="otherProduct"
        :key="otherProduct.slug"
        is-nav-others
      >
        <router-link
          :to="{ name: 'Product', params: { slug: otherProduct.slug } }"
        >
          <BaseButton class="btn--primary" />
        </router-link>
      </NavCard>
    </NavCardsLayout>
  </section>
</template>

<script>
import NavCardsLayout from '@/components/NavCardsLayout.vue'
import NavCard from '@/components/NavCard.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'NavOtherProductsCards',
  props: ['otherProducts', 'slug'],
  components: {
    NavCardsLayout,
    NavCard,
    BaseButton,
  },
}
</script>

<style lang="scss">
.other-products {
  h3 {
    text-align: center;
    @include margin-or-padding-responsive(margin-bottom, $sp-8, $sp-7, $sp-5);
  }
}
</style>
