<template>
  <div class="nav-card">
    <div class="nav-card__image" :class="isNavCategory && navItem.name">
      <picture v-if="isNavOthers" :key="navItem.slug">
        <source
          :srcset="require(`@/assets/${navItem.image.mobile}`)"
          media="(max-width: 500px)"
        />
        <source
          :srcset="require(`@/assets/${navItem.image.tablet}`)"
          media="(max-width: 860px)"
        />
        <img :src="require(`@/assets/${navItem.image.desktop}`)" />
      </picture>

      <img
        v-if="isNavCategory"
        :src="require(`@/assets/${navItem.image}`)"
        :alt="navItem.name"
      />
    </div>
    <h6 class="nav-card__title">{{ navItem.name }}</h6>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NavCard',
  props: {
    navItem: {
      type: Object,
    },
    isNavCategory: {
      type: Boolean,
    },
    isNavOthers: {
      type: Boolean,
    },
  },
}
</script>

<style lang="scss">
.nav-card {
  //height: auto;
  @include flex-column(center);

  .nav-card__image {
    img {
      width: 100%;
      height: auto;
    }
  }

  &.nav-card--category {
    @include margin-or-padding-responsive(margin-top, 30px, 68px, 68px);
    @include margin-or-padding-responsive(padding-bottom, 30px, 20px, 20px);
    background-color: $light-bg-100;
    border-radius: $border-rd;

    @include media-query-tablet {
      height: 165px;
    }

    .nav-card__image {
      position: relative;
      width: 210px;
      height: 200px;
      @include margin-or-padding-responsive(margin-top, -90px, -60px, -60px);

      @include media-query-tablet {
        width: 160px;
        height: 160px;
      }

      img {
        position: absolute;
        bottom: 0;
      }
    }

    .nav-card__title {
      margin-bottom: 14px;

      @include media-query-tablet {
        font-size: 15px;
      }
    }
  }

  &.nav-card--others {
    .nav-card__image,
    .nav-card__title {
      margin-bottom: 32px;
    }

    .nav-card__image {
      @include width-or-height-responsive(height, 318px, 318px, 120px);
      background-color: $light-bg-100;
      border-radius: $border-rd;

      picture {
        @include center-flex();
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
          object-fit: contain;
          border-radius: $border-rd;
        }
      }

      @include media-query-mobile {
        width: 100%;
      }
    }

    .nav-card__title {
      font-size: 24px;
    }
  }

  .earphones {
    @include media-query-tablet {
      width: 180px;
      margin-bottom: -10px;
    }

    @include media-query-mobile {
      margin-bottom: -20px;
    }
  }
}
</style>
