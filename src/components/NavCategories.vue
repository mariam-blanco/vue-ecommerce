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
        <router-link
          class="nav-link"
          :to="{ name: 'Category', params: { category: category.name } }"
        >
          <BaseButton @click="closeModal" class="btn--link-arrow" text="Shop">
            <BaseIcon icon-name="icon-arrow-right" :width="8" :height="12" />
          </BaseButton>
        </router-link>
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
    closeModal() {
      if (this.$store.state.isOpen) {
        this.$store.commit('SET_IS_OPEN', false)
      }
    },
  },
}
</script>

<style lang="scss"></style>
