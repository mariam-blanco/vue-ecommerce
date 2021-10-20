<template>
  <footer class="footer">
    <div class="footer__line"></div>
    <div class="footer__logo">
      <img src="@/assets/shared/desktop/logo.svg" alt="" />
    </div>
    <div class="footer__nav"><slot /></div>
    <div class="footer__text">
      <p>
        Audiophile is an all in one stop to fulfill your audio needs. We're a
        small team of music lovers and sound specialists who are devoted to
        helping you get the most out of personal audio. Come and visit our demo
        facility - we’re open 7 days a week.
      </p>
    </div>
    <div class="footer__social">
      <a href="https://www.facebook.com/">
        <BaseIcon iconName="icon-facebook" />
      </a>
      <a href="https://www.twitter.com/">
        <BaseIcon iconName="icon-twitter" :height="20" />
      </a>
      <a href="https://www.instagram.com/">
        <BaseIcon iconName="icon-instagram" />
      </a>
    </div>
    <div class="footer__copyright">Copyright 2021. All Rights Reserved</div>
  </footer>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'TheFooter',
  components: {
    BaseIcon,
  },
}
</script>

<style lang="scss">
.footer {
  width: 100%;
  @include footer-height-responsive();
  padding-bottom: 45px;
  background-color: $dark-bg;
  color: white;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 34px auto auto 1fr;
  grid-gap: 40px;
  grid-template-areas:
    '   line         .            .      '
    '   logo     navigation   navigation '
    ' paragraph   paragraph     social   '
    ' copyright   copyright   copyright  ';

  @include media-query-tablet {
    grid-template-rows: 20px auto auto 1fr auto;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      '   line         line    '
      '   logo         logo    '
      ' navigation  navigation '
      ' paragraph    paragraph '
      ' copyright     social   ';
  }

  @include media-query-mobile {
    padding-bottom: 38px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, auto);
    grid-gap: 45px;
    justify-items: center;
    grid-template-areas:
      '   line     '
      '   logo     '
      ' navigation '
      ' paragraph  '
      ' copyright  '
      '  social    ';
  }

  &__line {
    grid-area: line;
    width: 100px;
    height: 4px;
    background-color: $primary-color;
  }

  &__logo {
    grid-area: logo;
  }

  &__nav {
    grid-area: navigation;
    justify-self: end;

    @include media-query-tablet {
      justify-self: start;
    }

    @include media-query-mobile {
      justify-self: inherit;
    }
  }

  &__text {
    grid-area: paragraph;
    width: 540px;
    opacity: 0.5;

    @include media-query-tablet {
      width: 100%;
    }

    @include media-query-mobile {
      text-align: center;
    }
  }

  &__social {
    grid-area: social;
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 16px;

    a {
      height: auto;
      line-height: 0;

      svg {
        fill: $white;
      }
      &:hover {
        cursor: pointer;

        svg {
          fill: $primary-color;
        }
      }
    }

    @include media-query-mobile {
      justify-self: inherit;
    }
  }

  &__copyright {
    grid-area: copyright;
    opacity: 0.5;
    align-self: end;
  }
}
</style>
