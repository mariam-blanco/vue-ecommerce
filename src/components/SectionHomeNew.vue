<template>
  <section class="section home-new">
    <BaseCard
      class="card--home-new card--reverse text-white"
      name="XX99 Mark II Headphones"
      description="Experience natural, life like audio and exceptional build quality made for the passionate music enthusiast."
      :isNew="true"
      has-heading1
    >
      <router-link
        :to="{ name: 'Product', params: { slug: 'xx99-mark-two-headphones' } }"
      >
        <BaseButton class="btn--primary" />
      </router-link>
    </BaseCard>
  </section>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'SectionHomeNew',
  components: {
    BaseCard,
    BaseButton,
  },
}
</script>

<style lang="scss">
.home-new {
  border-top: 1px solid $border-color;

  @include media-query-mobile {
    margin-left: -24px;
    margin-right: -24px;
  }
}
</style>
