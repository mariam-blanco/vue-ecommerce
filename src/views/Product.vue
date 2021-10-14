<template>
  <BaseGoBackLink />

  <section v-if="product" class="section product">
    <div class="product__card">
      <BaseCard
        class="card--product-details"
        :name="product.name"
        :description="product.description"
        :price="product.price"
        :image="product.image"
        :isNew="product.new"
        :key="product.id"
        has-heading2
      >
        <div class="card-button-set">
          <ShoppingButtonQuantity :id="product.id" />
          <BaseButton
            @click="addToCart"
            class="btn--primary"
            text="Add to cart"
          />
        </div>
      </BaseCard>
    </div>

    <div class="product__features-includes">
      <div class="product-features">
        <h3 class="product-features__title">Features</h3>
        <p class="product-features__content">{{ product.features }}</p>
      </div>
      <div class="product-includes">
        <h3 class="product-includes__title">In the box</h3>
        <ul class="product-includes__list">
          <li v-for="(include, index) in includes" :key="index">
            <span>{{ include.quantity }}x</span>{{ include.item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="product__gallery">
      <picture v-for="(image, i) in gallery" :class="`image-${i}`" :key="i">
        <source
          :srcset="require(`@/assets/${image.mobile}`)"
          media="(max-width: 500px)"
        />
        <source
          :srcset="require(`@/assets/${image.tablet}`)"
          media="(max-width: 860px)"
        />
        <img :src="require(`@/assets/${image.desktop}`)" />
      </picture>
    </div>
  </section>

  <section class="section other-products">
    <h3>You may also like</h3>
    <NavCardsLayout>
      <NavCard
        class="nav-card--others"
        v-for="other in product.others"
        :nav-item="other"
        :key="other.slug"
        is-nav-others
      >
        <router-link :to="{ name: 'Product', params: { slug: other.slug } }">
          <BaseButton class="btn--primary" />
        </router-link>
      </NavCard>
    </NavCardsLayout>
  </section>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseGoBackLink from '@/components/BaseGoBackLink.vue'
import ShoppingButtonQuantity from '@/components/ShoppingButtonQuantity.vue'
import NavCardsLayout from '@/components/NavCardsLayout.vue'
import NavCard from '@/components/NavCard.vue'

import { watchEffect } from 'vue'

export default {
  name: 'Product',
  props: ['slug'],

  components: {
    BaseCard,
    BaseButton,
    BaseGoBackLink,
    ShoppingButtonQuantity,
    NavCardsLayout,
    NavCard,
  },

  created() {
    watchEffect(() => {
      /* IMPORTANT! Before to make the API call we have to clear out the 'product'
         shown in the page. If not, we will have to click the browser update button
         to see new product. */
      this.$store.commit('SET_PRODUCT', {})
      this.$store.dispatch('fetchProduct', this.slug)

      /* Initializes quantity with a new product details page */
      this.$store.commit('SET_QUANTITY', 1)
    })
  },

  computed: {
    product() {
      return this.$store.state.product
    },

    gallery() {
      return this.$store.state.product.gallery
    },

    includes() {
      return this.$store.state.product.includes
    },

    shortName() {
      const removeWords = ['WIRELESS', 'HEADPHONES', 'EARFHONES', 'SPEAKER']
      const itemName = this.product.name.toUpperCase()
      const removeWord = removeWords.filter(
        (word) => itemName.indexOf(word) !== -1
      )
      const i = itemName.indexOf(removeWord)
      return itemName.slice(0, i - 1)
    },
  },

  methods: {
    addToCart() {
      const cartItem = {
        id: this.product.id,
        name: this.product.name,
        shortName: this.shortName,
        price: this.product.price,
        image: `${this.product.slug}.jpg`,
        quantity: this.$store.state.initialQuantity,
      }

      this.$store.dispatch('addProductToCart', cartItem)
      this.$store.dispatch('openModalComponent', 'ShoppingCart')
      this.$store.commit('SET_IS_OPEN', true)
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="scss">
.product {
  .product__features-includes h3 {
    /* prettier-ignore */
    @include margin-or-padding-responsive(
      margin-bottom, 
      $sp-4, $sp-4, $sp-3);
  }

  &__features-includes {
    height: auto;
    display: grid;
    @include gap(column-gap);
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr;
    /* prettier-ignore */
    grid-template-areas: 
      'features  includes';

    @include media-query-tablet {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      row-gap: 120px;
      grid-template-areas:
        'features'
        'includes';
    }

    .product-features {
      grid-area: features;
    }

    .product-includes {
      @include gap(column-gap);
      grid-area: includes;
      padding-left: $sp-12;

      @include media-query-tablet {
        padding-left: 0;
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-template-rows: 1fr;
        /* prettier-ignore */
        grid-template-areas: 
          'includes-title    includes-list';
      }

      @include media-query-mobile {
        @include changeTo-column(includes-title, includes-list);
      }

      &__title {
        grid-area: includes-title;
        /* prettier-ignore */
        @include margin-or-padding-responsive(
          margin-bottom,
          $sp-4, $sp-4, $sp-3  
        );
      }

      &__list {
        grid-area: includes-list;
        @include media-query-tablet {
          padding-left: $sp-7;
        }
        @include media-query-mobile {
          padding-left: 0;
        }

        li span {
          margin-right: 20px;
          color: $primary-color;
          font-weight: 700;
        }
      }
    }
  }

  /* prettier-ignore */
  &__gallery {
    height: 592px;
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr 1fr;
    @include gap();
    grid-template-areas:
      'image-sm-01  image-lg-03'
      'image-sm-02  image-lg-03';

    @include media-query-tablet {
      height: auto;
    }

    @include media-query-mobile {
      height: auto;
      grid-template-columns: 1fr;
      grid-template-rows: 174px 174px 368px;
      grid-template-areas:
        'image-sm-01'
        'image-sm-02'
        'image-lg-03';
    }

    .image-first  { grid-area: image-sm-01; }
    .image-second { grid-area: image-sm-02; }
    .image-third  { grid-area: image-lg-03; }  

    .image-first,
    .image-second,
    .image-third {
      border-radius: $border-rd;

      img {
        width: 100%;
        height: 100%;
        border-radius: $border-rd;
        object-fit: cover;
        overflow: hidden;
      }
    }
  }
}

.other-products {
  h3 {
    text-align: center;
    /* prettier-ignore */
    @include margin-or-padding-responsive(
      margin-bottom, 
      $sp-8, $sp-7, $sp-5);
  }
}
</style>
