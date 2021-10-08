<template>
  <button class="btn">{{ text }}<slot /></button>
</template>

<script>
export default {
  name: 'BaseButton',
  components: 'BaseIcon',

  props: {
    text: {
      type: String,
      default: 'See product',
    },
  },
}
</script>

<style lang="scss">
.btn {
  @include text(13px, 25px, 1px);
  width: 160px;
  height: 48px;

  &.btn--block {
    width: 100%;
  }

  &.btn--primary {
    background-color: $primary-color;
    color: white;

    &:hover {
      background-color: $primary-color-l;
    }
  }

  &.btn--secondary {
    background-color: black;
    color: white;

    &:hover {
      background-color: $grey;
    }
  }

  &.btn--outline {
    background-color: transparent;
    border: 1px solid $black;

    &:hover {
      background-color: $black;
      color: white;
    }
  }

  &.btn--link,
  &.btn--link-arrow {
    height: auto;
    width: auto;
    color: $black-50;
  }

  &.btn--link-arrow {
    svg {
      vertical-align: -1px;
      height: 100%;
      margin-left: 12px;
      fill: none;
      stroke-width: 2;
      stroke: $primary-color;
    }

    &:hover {
      color: $primary-color;
    }
  }
}
</style>
