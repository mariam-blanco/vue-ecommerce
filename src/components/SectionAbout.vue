<template>
  <section class="section about">
    <div class="card">
      <div class="card__body">
        <div class="inner-body">
          <h2 class="title">Bringing you the <span> best </span> audio gear</h2>
          <p class="description">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
      <div class="card__image">
        <picture>
          <source
            :srcset="require(`@/assets/${image.mobile}`)"
            media="(max-width: 500px)"
          />
          <source
            :srcset="require(`@/assets/${image.tablet}`)"
            media="(max-width: 860px)"
          />
          <img :src="require(`@/assets/${image.desktop}`)" alt="About" />
        </picture>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionAbout',

  data() {
    return {
      image: {
        mobile: 'shared/mobile/image-best-gear.jpg',
        tablet: 'shared/tablet/image-best-gear.jpg',
        desktop: 'shared/desktop/image-best-gear.jpg',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  height: 588px;
  grid-template-areas: 'card-body  card-image';

  @include media-query-tablet {
    @include changeTo-column-centered;
  }

  &__body {
    grid-area: card-body;
    padding-right: $sp-12;
    padding-left: 0; // removes BaseCard default value

    @include media-query-tablet {
      padding: $sp-7;
      padding-bottom: 0;
    }
    @include media-query-mobile {
      padding: 0;
      padding-top: $sp-2;
    }

    .inner-body {
      .title {
        width: auto; // removes 'min-content' width
        display: inline-block; // removes display: inline-flex;
        margin-bottom: 32px;
        span {
          color: $primary-color;
        }
      }
    }
  }

  &__image {
    grid-area: card-image;

    @include media-query-tablet {
      height: 300px;

      img {
        object-fit: cover;
      }
    }
  }
}
</style>
