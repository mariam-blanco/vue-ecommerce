<template>
  <div
    @click.self="closeModal"
    class="modal-mask"
    :class="[isOpen || 'hidden']"
  >
    <div class="modal">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  computed: {
    isOpen() {
      return this.$store.state.isOpen
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('SET_IS_OPEN', false)
    },
  },
}
</script>

<style lang="scss">
.modal-mask {
  position: absolute;
  z-index: 10;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);

  &.hidden {
    display: none;
  }
}

.modal {
  z-index: 20;
  position: absolute;
  background-color: $white;
  border-radius: $border-rd;
}

.modal-cart .modal {
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
      left: $sp-3;
      right: $sp-3;
    }
}

  .modal-confirmation .modal {
    max-width: 540px;
  }

  .modal-navigation .modal {
    top: 0;
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

   .modal--centered {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>
