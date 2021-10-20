<template>
  <div class="checkout">
    <div class="checkout__header">
      <h3>Checkout</h3>
    </div>
    <!-- id="checkoutForm" lets associate the form with a button that is outside <form> tags.
          The associte button must have an atribute form="checkoutForm" -->
    <form
      @submit.prevent="sendForm"
      id="checkoutForm"
      novalidate="true"
      class="checkout__form"
    >
      <fieldset class="form-fieldset">
        <legend class="subtitle">Billing Details</legend>
        <BaseInput
          label="Name"
          v-model="clientDetails.name"
          type="text"
          placeholder="Alexei Ward"
          :error="errors.name"
        />
        <BaseInput
          label="Email Address"
          v-model="clientDetails.email"
          type="email"
          placeholder="alexei@mail.com"
          :error="errors.email"
        />
        <BaseInput
          label="Phone Number"
          v-model="clientDetails.phone"
          type="tel"
          placeholder="+1 202-555-0136"
          :error="errors.phone"
        />
      </fieldset>

      <fieldset class="form-fieldset">
        <legend class="subtitle">Shipping info</legend>

        <BaseInput
          style-modifier="span2-col"
          label="Address"
          v-model="clientDetails.address"
          type="text"
          placeholder="1137 Williams Avenue"
          :error="errors.address"
        />
        <BaseInput
          label="ZIP Code"
          v-model="clientDetails.code"
          type="text"
          placeholder="10001"
          :error="errors.code"
        />
        <BaseInput
          label="City"
          v-model="clientDetails.city"
          type="text"
          placeholder="New York"
          :error="errors.city"
        />
        <BaseInput
          label="Country"
          v-model="clientDetails.country"
          type="text"
          placeholder="United States"
          :error="errors.country"
        />
      </fieldset>

      <fieldset class="form-fieldset">
        <legend class="subtitle">Payment details</legend>

        <label class="form-field--span2-row">Payment Method</label>

        <BaseRadio
          style-modifier="wrapper"
          label="e-Money"
          v-model="clientDetails.paymentMethod"
          value="eMoney"
          name="payment-method"
          checked
        />

        <BaseRadio
          style-modifier="wrapper"
          label="Cash on Delivery"
          v-model="clientDetails.paymentMethod"
          value="cash"
          name="payment-method"
        />

        <BaseInput
          v-if="clientDetails.paymentMethod === 'eMoney'"
          label="e-Money Number"
          v-model="clientDetails.eMoney.number"
          type="text"
          placeholder="238521993"
        />
        <BaseInput
          v-if="clientDetails.paymentMethod === 'eMoney'"
          label="e-Money PIN"
          v-model="clientDetails.eMoney.pin"
          type="text"
          placeholder="6891"
        />

        <div v-if="clientDetails.paymentMethod === 'cash'" class="payment-cash">
          <img src="@/assets/shared/desktop/icon-cash.svg" />
          <p>
            The ‘Cash on Delivery’ option enables you to pay in cash when our
            delivery courier arrives at your residence. Just make sure your
            address is correct so that your order will not be cancelled.
          </p>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import BaseRadio from '@/components/BaseRadio.vue'
import ProductService from '@/services/ProductService.js'

export default {
  name: 'CheckoutForm',
  components: {
    BaseInput,
    BaseRadio,
  },
  data() {
    return {
      errors: {},
      clientDetails: {
        name: '',
        email: '',
        phone: '',
        address: '',
        code: '',
        city: '',
        country: '',
        paymentMethod: 'eMoney',
        eMoney: {
          number: null,
          pin: null,
        },
      },
    }
  },

  methods: {
    formNotValid() {
      this.errors = {}
      // eslint-disable-next-line no-unused-vars
      const { paymentMethod, eMoney, ...clientDetailsRest } = this.clientDetails

      for (const detail in clientDetailsRest) {
        if (!clientDetailsRest[detail]) {
          this.errors[detail] = `${detail} required`
        }
      }

      return Object.keys(this.errors).length !== 0 ? true : false
    },

    sendForm() {
      // 1.- confirm form is filled & send the information
      if (this.formNotValid()) {
        return
      }

      ProductService.sendShoppingDetails(this.clientDetails)
        .then((response) => {
          // open 'ShoppingConfirmation' component. Once the modal is open
          // it shoudn't get closed
          this.$store.dispatch('openModalComponent', 'ShoppingConfirmation')
          this.$store.commit('SET_IS_OPEN', true)
          window.scrollTo(0, 0)
          console.log('Response', response)
        })
        .catch((error) => {
          console.log('Error', error)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@/styles/forms.scss';

.checkout {
  flex: 1;
  max-width: 730px;
  padding: 54px 48px 48px;
  border-radius: $border-rd;
  background-color: $white;

  @include media-query-tablet {
    width: 100%;
    padding: 32px 28px;
  }

  @include media-query-mobile {
    padding: 32px 24px;
  }

  &__header {
    margin-bottom: $sp-5;
    @include media-query-mobile {
      margin-bottom: $sp-2;
    }
  }
}
</style>
