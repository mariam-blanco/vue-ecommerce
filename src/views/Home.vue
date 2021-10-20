<template>
  <!-- Section ---------------------------------------------------->
  <section class="section home-new">
    <BaseCard
      class="card--home-new card--reverse text-white"
      name="XX99 Mark II Headphones"
      description="Experience natural, life like audio and exceptional build quality made for the passionate music enthusiast."
      :isNew="true"
      has-heading1
    >
      <BaseButton
        @click="goToProduct('xx99-mark-two-headphones')"
        class="btn--primary"
      />
    </BaseCard>
  </section>

  <!-- Section ---------------------------------------------------->
  <section class="section home-products">
    <BaseCard
      class="card--home-large ZX9-speaker text-white"
      name="ZX9 Speaker"
      description="Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound."
      :image="{
        mobile: 'home/mobile/image-speaker-zx9.png',
        tablet: 'home/tablet/image-speaker-zx9.png',
        desktop: 'home/desktop/image-speaker-zx9.png',
      }"
      has-heading1
    >
      <BaseButton @click="goToProduct('zx9-speaker')" class="btn--secondary" />
    </BaseCard>

    <BaseCard
      class="card--home-medium card--reverse ZX7-speaker"
      name="ZX7 Speaker"
      has-heading4
    >
      <BaseButton @click="goToProduct('zx7-speaker')" class="btn--outline" />
    </BaseCard>

    <BaseCard
      class="card--home-medium YX1-earphones"
      name="YX1 Earphones"
      :image="{
        mobile: 'home/mobile/image-earphones-yx1.jpg',
        tablet: 'home/tablet/image-earphones-yx1.jpg',
        desktop: 'home/desktop/image-earphones-yx1.jpg',
      }"
      has-heading4
    >
      <BaseButton @click="goToProduct('yx1-earphones')" class="btn--outline" />
    </BaseCard>
  </section>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'Home',
  components: {
    BaseCard,
    BaseButton,
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
/* This lets change the order or 'NavCategories' component of
   App.vue and change the place in Home page  */
/* prettier-ignore */
.main--home {
  .section {
    &.home-new      { order: 1; }
    &.change-order  { order: 2; }
    &.home-products { order: 3; } 
    &.about         { order: 4; } 
  }
}

.section {
  &.home-new {
    border-top: 1px solid $border-color;
    // to adjust categories margin. If this is changed will cause
    // problems in the categories modal navigation
    margin-bottom: -50px;
    @include media-query-mobile {
      margin-left: -24px;
      margin-right: -24px;
    }
  }

  &.home-products {
    display: grid;
    justify-items: stretch;
    grid-template-columns: 1fr;
    grid-template-rows: 560px 320px 320px;
    /* prettier-ignore */
    @include gap-responsive(
      row-gap, 
      $sp-5, $sp-4, $sp-3);
    grid-template-areas:
      'card-01'
      'card-02'
      'card-03';

    @include media-query-tablet {
      grid-template-rows: 720px 320px 320px;
    }

    @include media-query-mobile {
      grid-template-rows: 600px 320px 1fr;
    }
  }
}

.ZX9-speaker {
  grid-area: card-01;

  @include media-query-tablet {
    @include changeTo-column-centered();
  }

  .card__body {
    .inner-body {
      max-width: 340px;
      @include margin-bottom-text-blocks(null, $sp-3, $sp-5);

      @include media-query-mobile {
        .title {
          font-size: 36px;
        }

        .description {
          margin-bottom: $sp-3;
        }
      }
    }
  }
}

%title {
  margin-bottom: $sp-4;
  @include remove-min-content();
}

.ZX7-speaker {
  grid-area: card-02;

  @include media-query-mobile {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: ' card-body  ';
  }

  .card__body {
    .title {
      @extend %title;
    }
  }
}

.YX1-earphones {
  grid-area: card-03;

  @include media-query-mobile {
    @include changeTo-column();
    grid-template-rows: 200px 200px;
  }

  .card__image {
    grid-area: card-image;
    height: 100%;
  }

  .card__body {
    grid-area: card-body;
    height: 100%;
    background-color: $light-bg-100;

    .title {
      @extend %title;
    }
  }
}

/*------ Background images & images ---------- */

.ZX9-speaker {
  background: left / cover no-repeat $primary-color
    url('../assets/home/desktop/pattern-circles.svg');

  @include media-query-tablet {
    background-size: 125%;
    background-position: center top -250px;
  }

  @include media-query-mobile {
    background-size: 100%;
  }

  .card__image {
    position: relative;

    img {
      position: absolute;
      margin-bottom: -8px;
      right: 0;
      bottom: 0;
      width: 80%;
      height: auto;

      @include media-query-tablet {
        top: 52px;
        left: 50%;
        transform: translate(-50%, 0);
        width: auto;
        height: 240px;
      }

      @include media-query-mobile {
        height: 200px;
      }
    }
  }
}

.ZX7-speaker {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @include back-image-responsive('../assets/home', 'image-speaker-zx7.jpg');
}

.YX1-earphones .card__image {
  height: 100%;

  @include media-query-mobile {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
