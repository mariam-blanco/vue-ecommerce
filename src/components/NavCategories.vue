<template>
  <section class="section nav-categories">
    <NavCardsLayout>
      <NavCard
        class="nav-card--category"
        v-for="category in categories"
        :nav-item="category"
        :key="category.id"
        is-nav-category
      >
        <BaseButton
          @click="goToCategory(category.name)"
          class="btn--link-arrow"
          text="Shop"
        >
          <BaseIcon icon-name="icon-arrow-right" :width="8" :height="12" />
        </BaseButton>
      </NavCard>
    </NavCardsLayout>
  </section>
</template>

<script>
import NavCardsLayout from '@/components/NavCardsLayout.vue'
import NavCard from '@/components/NavCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'NavCategories',

  components: {
    NavCardsLayout,
    NavCard,
    BaseButton,
    BaseIcon,
  },

  data() {
    return {
      categories: [
        {
          id: '1',
          name: 'headphones',
          image: 'shared/desktop/image-headphones.png',
        },
        {
          id: '2',
          name: 'speakers',
          image: 'shared/desktop/image-speakers.png',
        },
        {
          id: '3',
          name: 'earphones',
          image: 'shared/desktop/image-earphones.png',
        },
      ],
    }
  },

  methods: {
    goToCategory(categoryName) {
      this.$router.push({
        name: 'Category',
        params: { category: categoryName },
      })

      if (this.$store.state.isOpen) {
        this.$store.commit('SET_IS_OPEN', false)
      }
    },
  },
}
</script>

<style lang="scss">
.main--home .nav-categories {
}
</style>
