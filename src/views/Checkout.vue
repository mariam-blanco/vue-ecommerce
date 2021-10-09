<template>
  <div class="page page--checkout">
    <CheckoutForm />
    <CheckoutSummary />
    
  </div>
</template>

<script>
import CheckoutForm from '@/components/CheckoutForm.vue'
import CheckoutSummary from '@/components/CheckoutSummary.vue'


export default {
  name: 'Checkout',
  components: {
    CheckoutForm,
    CheckoutSummary,
   
  },
}
</script>

<style lang="scss">
.main .page--checkout {
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;

  @include media-query-tablet {
    flex-direction: column;
  }
}
</style>
