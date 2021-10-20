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
  @include flex-column($justify-c: flex-end);
  .nav-card__image {
    img {
      width: 100%;
      height: auto;
    }
  }

  &.nav-card--category {
    height: 204px;

    /* prettier-ignore */
    @include margin-or-padding-responsive(
      margin-top, 
      80px, 80px, 68px);
    /* prettier-ignore */
    @include margin-or-padding-responsive(
      padding-bottom, 
      30px, 20px, 20px);
    background-color: $light-bg-100;
    border-radius: $border-rd;
    @include media-query-tablet {
      height: 165px;
    }

    .nav-card__image {
      width: 210px;
      height: 190px;
      /* prettier-ignore */
      @include margin-or-padding-responsive(
        margin-top,  
        -90px, -60px, -60px);

      @include media-query-tablet {
        width: 160px;
        height: 160px;
      }

      img {
        overflow: hidden;
      }

      &.earphones {
        width: 220px;
        height: 170px;

        @include media-query-tablet {
          width: 200px;
          height: 150px;
        }
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
      /* prettier-ignore */
      @include width-or-height-responsive(
        height, 
        318px, 318px, 120px);
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
}
</style>
