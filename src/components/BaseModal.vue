<template>
  <div
    @click.self="closeModal"
    class="modal-mask"
    :class="[isOpen || 'hidden']"
  >
    <div class="modal" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  inheritAttrs: false, // classes applied to tha component can be passed to the child
  computed: {
    isOpen() {
      return this.$store.state.isOpen
    },
  },
  methods: {
    closeModal() {
      this.$store.state.activeModalComponent !== 'ShoppingConfirmation' &&
        this.$store.commit('SET_IS_OPEN', false)
    },
  },
}
</script>

<style lang="scss">
.modal-mask {
  position: absolute;
  z-index: 10;
  top: 97px;
  bottom: -97px;
  left: 0;
  width: 100vw;
  height: 100%;
  @include center-flex(center);
  background-color: rgba(0, 0, 0, 0.4);

  @include media-query-tablet {
    top: 90px;
    bottom: -90px;
  }

  &.hidden {
    display: none;
  }
}

.main--checkout .modal-mask {
  top: 0;
}

.modal {
  z-index: 20;
  position: absolute;
  background-color: $white;
  border-radius: $border-rd;

  &.modal--cart {
    width: 377px;
    top: 32px;
    right: $sp-3;

    @media only screen and (min-width: 1100px) {
      left: 50%;
      transform: translate(47%, 0);
    }

    @include media-query-desktop {
      right: $sp-3;
    }
    @include media-query-tablet {
      right: $sp-5;
    }
    @include media-query-mobile {
      width: auto;
      right: $sp-3;
      left: $sp-3;
    }
  }

  &.modal--confirmation {
   
    max-width: 540px;
    top: 50px;
    //transform: translate(0, -50%);

    @include media-query-tablet {
      margin-right: $sp-5;
      margin-left: $sp-5;
    }

    @include media-query-mobile {
      margin-right: $sp-3;
      margin-left: $sp-3;
    }
  }

  &.modal--navigation {
    top: 0;

    @include media-query-desktop {
      display: none;
    }

    @include media-query-tablet {
      width: 100%;
      padding: 56px 40px 67px;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }

    @include media-query-mobile {
      left: 0;
      right: 0;
    }
  }

  &.modal--centered {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
