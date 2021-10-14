<template>
  <div class="checkout">
    <div class="checkout__header">
      <h3>Checkout</h3>
    </div>
    <form class="checkout__form">
      <fieldset class="form-fieldset">
        <legend class="subtitle">Billing Details</legend>
        <BaseInput
          label="Name"
          v-model="customer.name"
          type="text"
          placeholder="Alexei Ward"
        />
        <BaseInput
          label="Email Address"
          v-model="customer.email"
          type="text"
          placeholder="alexei@mail.com"
        />
        <BaseInput
          label="Phone Number"
          v-model="customer.phone"
          type="text"
          placeholder="+1 202-555-0136"
        />
      </fieldset>

      <fieldset class="form-fieldset">
        <legend class="subtitle">Shipping info</legend>

        <BaseInput
          style-modifier="span2-col"
          label="Address"
          v-model="customer.address"
          type="text"
          placeholder="1137 Williams Avenue"
        />
        <BaseInput
          label="ZIP Code"
          v-model="customer.code"
          type="text"
          placeholder="10001"
        />
        <BaseInput
          label="City"
          v-model="customer.city"
          type="text"
          placeholder="New York"
        />
        <BaseInput
          label="Country"
          v-model="customer.country"
          type="text"
          placeholder="United States"
        />
      </fieldset>

      <fieldset class="form-fieldset">
        <legend class="subtitle">Payment details</legend>

        <label class="form-field--span2-row">Payment Method</label>

        <BaseRadio
          style-modifier="wrapper"
          label="e-Money"
          v-model="customer.paymentMethod"
          value="eMoney"
          name="payment-method"
          checked
        />
        
        <BaseRadio
          style-modifier="wrapper"
          label="Cash on Delivery"
          v-model="customer.paymentMethod"
          value="cash"
          name="payment-method"
        />

        <BaseInput
          v-if="customer.paymentMethod === 'eMoney'"
          label="e-Money Number"
          v-model.number="customer.eMoney.number"
          type="number"
          placeholder="238521993"
        />
        <BaseInput
          v-if="customer.paymentMethod === 'eMoney'"
          label="e-Money PIN"
          v-model.number="customer.eMoney.pin"
          type="number"
          placeholder="6891"
        />

        <div v-if="customer.paymentMethod === 'cash'" class="payment-cash">
          <img src="@/assets/shared/desktop/icon-cash.svg" />
          <p>
            The ‘Cash on Delivery’ option enables you to pay in cash when our
            delivery courier arrives at your residence. Just make sure your
            address is correct so that your order will not be cancelled.
          </p>
        </div>
      </fieldset>
    </form>

    <div class="checkout__footer"></div>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import BaseRadio from '@/components/BaseRadio.vue'

export default {
  name: 'CheckoutForm',
  components: {
    BaseInput,
    BaseRadio
  },
  data() {
    return {
      customer: {
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
    eMoneyOptions() {},
  },
}
</script>

<style lang="scss">
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
.form-fieldset {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  column-gap: $sp-2;
  row-gap: $sp-3;
  margin-bottom: $sp-7;

  @include media-query-mobile {
    grid-template-columns: 1fr;
    margin-bottom: $sp-4;
  }

  legend {
    margin-bottom: $sp-2;
  }

  &:last-child {
    margin-bottom: 0; /* removes 'margin-bottom: $sp-7' */
  }
}

%input-wrapper {
  height: 56px;
  border: solid 1px $border-input-color;
  border-radius: $border-rd;
}

.form-field {

  input[type='text'],
  input[type='number'] {
    @extend %input-wrapper;
    width: 100%;
    margin-top: $sp-1;
    padding-left: $sp-3;

    &:focus {
      border: solid 1px $primary-color;
      color: $primary-color;
    }
  }

  input[type='radio'] {
  position: absolute;
  top: 20px;
  left: 10px;
  opacity: 0;
  margin-right: $sp-2;
  border: solid 1px $border-input-color;

  & + .checkmark {
    position: absolute;
    top: 18px;
    left: $sp-2;
    width: 20px;
    height: 20px;
    border: solid 1px $border-input-color;
    border-radius: 50%;
  }

  & + .checkmark:after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  &:checked + .checkmark:after {
    background-color: $primary-color;
  }
}
}
.form-field--span2-col {
  grid-column: span 2;

  @include media-query-mobile {
    grid-column: span 1;
  }
}

.form-field--span2-row {
  grid-row: span 2;
}

.form-field--wrapper {
  @extend %input-wrapper;
  position: relative;
  padding-top: 20px;
  padding-left: $sp-6;
}



.payment-cash {
  grid-column: span 2;
  display: flex;
  gap: 32px;
}
</style>
