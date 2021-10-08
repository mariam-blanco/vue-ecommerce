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
        <img :src="require(`@/assets/${image.desktop}`)" />
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
  },
}
</script>

<style lang="scss">
.card {
  display: grid;
  justify-items: stretch;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'card-image  card-body';
  @include gap-responsive(gap, 30px, 20px, 20px);
  border-radius: $border-rd;

  &__image,
  &__body {
    width: 100%;
    height: 100%;
    border: dashed 1px brown;
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
    padding-left: $sp-12;

    @include media-query-mobile {
      padding-top: 12px;
    }

    .inner-body {
      @include margin-bottom-text-blocks($sp-2, $sp-4, $sp-5);

      @include media-query-tablet {
        @include margin-bottom-text-blocks($sp-2, $sp-4, $sp-3);
      }

      @include media-query-mobile {
        @include margin-bottom-text-blocks($sp-3, $sp-3, $sp-3);
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
          $sp-6,
          $sp-4,
          $sp-4
        );
        padding-bottom: $sp-6;
      }
      .card-button-set {
        display: flex;
        gap: 16px;
      }
    }
  }

  /* ------ Card modifiers ------  */

  &.card--reverse {
    grid-template-areas: 'card-body  card-image';
  }

  &.card--product-by-category,
  &.card--product-details {
    &.card--reverse .card__body {
      padding-left: 0;
      @include margin-or-padding-responsive(padding-right, $sp-12, $sp-7, 0);
    }

    .card__image {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $light-bg-100;
    }
  }

  &.card--home-new {
    @include width-or-height-responsive(height, 632px, 632px, 510px);
    .card__body {
      padding-left: 0;
      padding-right: $sp-12;

      .inner-body {
        /* same width for tablet. For 'mobile' is 100% */
        max-width: 380px;
        @include margin-bottom-text-blocks($sp-3, $sp-3, $sp-5);

        .overline {
          color: $white-50;
        }

        .description {
          max-width: 350px;
          color: $white-75;
        }
      }
    }

    @include media-query-tablet {
      @include changeTo-column-centered();
      grid-template-rows: 1fr;
      grid-template-areas: ' card-body  ';

      .card__body {
        padding: 0;
      }
    }
  }

  &.card--product-by-category {
    height: auto;

    .card__image {
      @include width-or-height-responsive(height, 550px, 352px, 327px);
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
        padding-left: $sp-8;
        padding-right: $sp-8;
      }
    }
  }

  &.card--product-details {
    @include width-or-height-responsive(height, 560px, 480px, auto);

    /* ------- Media queries ------- */
    @include media-query-tablet {
      grid-template-columns: 2fr 3fr;
      grid-template-rows: 1fr;

      .card__body {
        padding-left: $sp-7;
      }
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
</style>
