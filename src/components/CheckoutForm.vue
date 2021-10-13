<template>
  <div class="checkout">
    <div class="checkout__header">
      <h3>Checkout</h3>
    </div>

    <form class="checkout__form">
      <fieldset class="form-fieldset">
        <legend class="subtitle">Billing Details</legend>
        <label
          >Name<input type="text" name="name" placeholder="Alexei Ward"
        /></label>
        <label
          >Email Address<input
            type="text"
            name="email"
            placeholder="alexei@mail.com"
        /></label>
        <label
          >Phone Number<input
            type="text"
            name="phone"
            placeholder="+1 202-555-0136"
        /></label>
      </fieldset>
      <fieldset class="form-fieldset">
        <legend class="subtitle">Shipping info</legend>
        <label class="form-field--span2-col"
          >Address
          <input
            type="text"
            name="address"
            placeholder="1137 Williams Avenue"
          />
        </label>
        <label
          >ZIP Code<input type="text" name="code" placeholder="10001"
        /></label>
        <label
          >City<input type="text" name="city" placeholder="New York"
        /></label>
        <label
          >Country<input type="text" name="country" placeholder="United States"
        /></label>
      </fieldset>
      <fieldset class="form-fieldset">
        <legend class="subtitle">Payment details</legend>
        <label class="form-field--span2-row">Payment Method</label>

        <label class="form-field__wrapper">
          <input type="radio" name="payment" value="e-Money" checked />
          <span class="checkmark"></span>
          e-Money
        </label>
        <label class="form-field__wrapper">
          <input type="radio" name="payment" value="cash" />
          <span class="checkmark"></span>
          Cash on Delivery
        </label>
        <label
          >e-Money Number<input
            type="text"
            name="e-money-number"
            placeholder="238521993"
        /></label>
        <label
          >e-Money PIN<input type="text" name="e-money-PIN" placeholder="6891"
        /></label>
      </fieldset>
    </form>

    <div class="checkout__footer"></div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutForm',
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

    .form-field--span2-col {
      grid-column: span 2;
      @include media-query-mobile {
      grid-column: span 1;  
    }
    }
    .form-field--span2-row {
      grid-row: span 2;
    }

    %input-wrapper {
      height: 56px;
      border: solid 1px $border-input-color;
      border-radius: $border-rd;
    }

    input[type='text'] {
      @extend %input-wrapper;
      width: 100%;
      margin-top: $sp-1;
      padding-left: $sp-3;

      &:focus {
        border: solid 1px $primary-color;
        color: $primary-color;
      }
    }

    label.form-field__wrapper {
      @extend %input-wrapper;
      position: relative;
      padding-top: 20px;
      padding-left: $sp-6;
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
}
</style>
