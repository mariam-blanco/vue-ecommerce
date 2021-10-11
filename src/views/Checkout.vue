<template>
  <BaseGoBackLink />
  <CheckoutForm />
  <CheckoutSummary />
</template>

<script>
import CheckoutForm from '@/components/CheckoutForm.vue'
import CheckoutSummary from '@/components/CheckoutSummary.vue'
import BaseGoBackLink from '@/components/BaseGoBackLink.vue'

export default {
  name: 'Checkout',
  components: {
    CheckoutForm,
    CheckoutSummary,
    BaseGoBackLink,
  },
}
</script>

<style lang="scss">
.main--checkout::before {
  content: '';
  background-color: $light-bg-100;
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1000;
  width: 100%;
  height: 100%;
}
</style>
