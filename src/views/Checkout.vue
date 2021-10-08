<template>
  <div class="page page--checkout">
    <CheckoutForm />
    <CheckoutSummary />
    <BaseModal class="modal--confirmation modal--centered">
      <ShoppingConfirmation />
    </BaseModal>
  </div>
</template>

<script>
import CheckoutForm from '@/components/CheckoutForm.vue'
import CheckoutSummary from '@/components/CheckoutSummary.vue'
import ShoppingConfirmation from '@/components/ShoppingConfirmation.vue'
import BaseModal from '@/components/BaseModal.vue'

export default {
  name: 'Checkout',
  components: {
    CheckoutForm,
    CheckoutSummary,
    ShoppingConfirmation,
    BaseModal,
  },
}
</script>

<style lang="scss">
.page--checkout {
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;

  @include media-query-tablet {
    flex-direction: column;
  }
}
</style>
