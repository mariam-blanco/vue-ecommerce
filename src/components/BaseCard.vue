<template>
  <div class="card">
    <div v-if="image" class="card__image">
      <picture>
        <source
          :srcset="require(`@/assets/${image.mobile}`)"
          media="(max-width: 500px)"
        />
        <source
          :srcset="require(`@/assets/${image.tablet}`)"
          media="(max-width: 860px)"
        />
        <img :src="require(`@/assets/${image.desktop}`)" :alt="name" />
      </picture>
    </div>
    <div class="card__body">
      <div class="inner-body">
        <p v-if="isNew" class="overline">New product</p>
        <h1 v-if="hasHeading1" class="title">{{ name }}</h1>
        <h2 v-if="hasHeading2" class="title">{{ name }}</h2>
        <h4 v-if="hasHeading4" class="title">{{ name }}</h4>
        <p v-if="description" class="description">
          {{ description }}
        </p>
        <p v-if="price" class="price price--bold">{{ price }}</p>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    name: String,
    description: String,
    image: Object,
    isNew: Boolean,
    price: Number,
    hasHeading1: Boolean,
    hasHeading2: Boolean,
    hasHeading4: Boolean,
  }
}
</script>

<style lang="scss">
.card {
  display: grid;
  justify-items: stretch;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'card-image  card-body';
  @include gap();
  border-radius: $border-rd;

  &__image,
  &__body {
    width: 100%;
    height: 100%;
    border-radius: $border-rd;
  }

  &__image {
    grid-area: card-image;
    overflow: hidden;

    img {
      /* Without width and height the property 
         'object-fit' doesn't work */
      width: 100%;
      height: 100%;
    }
  }

  &__body {
    grid-area: card-body;
    display: flex;
    align-items: center;
  }

  /* ------ Card modifiers ------  */

  &.card--reverse {
    grid-template-areas: 'card-body  card-image';
  }

  /* (Note: See cards of Home in Home.vue)  */

  &.card--product-by-category,
  &.card--product-details {
    .card__image {
      @include center-flex(center);
      background-color: $light-bg-100;
    }
  }

  &.card--home-new { 
    @include width-or-height-responsive(
      height, 
      632px, 632px, 510px);
    
    @include card-body-padding(
      0, $sp-12, 
      0, 0);

    @include media-query-tablet {
      @include changeTo-column-centered();
      grid-template-rows: 1fr;
      grid-template-areas: ' card-body  ';
    }
  }

  &.card--home-large {
    @include card-body-padding(
      $sp-12, $sp-12, 
      $sp-8, $sp-8,
      $sp-3, $sp-3);
    
    .card__body {
      @include margin-or-padding-responsive(
        padding-top,
        0, $sp-6, 0);
      
      @include margin-or-padding-responsive(
        padding-bottom,
        0, $sp-8, $sp-7);
    }
  }

  &.card--home-medium {
    @include card-body-padding(
      $sp-12, 0, 
      $sp-5, 0,
      $sp-3, 0);
  }

  &.card--product-by-category {
    height: auto;
    @include card-body-padding(
      $sp-12, 0, 
      $sp-8, $sp-8);

    &.card--reverse {
      @include card-body-padding(
        0, $sp-12, 
        $sp-8, $sp-8);
    }

    .card__image {
      @include width-or-height-responsive(
        height, 
        550px, 352px, 327px);
    }

    /* ------- Media queries ------- */
    @include media-query-tablet {
      @include changeTo-column-centered();

      .card__image picture {
        height: 100%;
        width: auto;
      }

      .card__body {
        padding-top: $sp-4;
      }
    }
  }

  &.card--product-details {
    @include width-or-height-responsive(
      height, 
      560px, 480px, auto);
    @include gap(column-gap); 
    
    @include card-body-padding(
      $sp-12, 0, 
      $sp-7, 0);

    /* ------- Media queries ------- */
    @include media-query-tablet {
      grid-template-columns: 2fr 3fr;
      grid-template-rows: 1fr;
    }

    @include media-query-mobile {
      @include changeTo-column();
      
      .card__image {
        height: 327px;

        picture {
          height: 100%;
          width: auto;
        }
      }
    }
  }
}

.inner-body {
  @include margin-bottom-text-blocks(
    $sp-2, $sp-4, $sp-5);

  @include media-query-tablet {
    @include margin-bottom-text-blocks(
      $sp-2, $sp-4, $sp-3);
    }

  @include media-query-mobile {
    @include margin-bottom-text-blocks(
      $sp-3, $sp-3, $sp-3);
    }

  .title {
    /* without this when the width is set to 'inline-flex' or
       'inline-block' it aligns the text at the left  */
    width: min-content;
    display: inline-flex;
  }

  .price {
    @include margin-or-padding-responsive(
      padding-bottom,
      $sp-6, $sp-4, $sp-4);
  }
      
  .card-button-set {
    display: flex;
    gap: 16px;
  }
}

.card--home-new {
  .inner-body {
    /* same width for tablet. For 'mobile' is 100% */
    max-width: 380px;
    @include margin-bottom-text-blocks(
      $sp-3, $sp-3, $sp-5);

    .overline {
      color: $white-50;
    }

    .description {
      max-width: 350px;
      color: $white-75;
    }
  }
}
</style>
