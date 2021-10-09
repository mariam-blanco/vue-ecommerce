<template>
  <div class="shopping-prices-table">
    <div>
      <div class="th">total</div>
      <div class="price price--bold">{{ total }}</div>
    </div>
    <div v-if="type === 'summary'">
      <div class="th">shipping</div>
      <div class="price price--bold">50</div>
    </div>
    <div v-if="type === 'summary'">
      <div class="th">VAT (included)</div>
      <div class="price price--bold">{{ tax }}</div>
    </div>
    <div v-if="type === 'summary'">
      <div class="th">grand total</div>
      <div class="price price--bold">{{ grandTotal }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingPricesTable',
  props: {
    type: String,
  },
  computed: {
    total() {
      return this.$store.state.total
    },

    tax() {
      return this.$store.state.tax
    },

    grandTotal() {
      return this.$store.state.grandTotal
    },
  },
}
</script>

<style lang="scss">
.shopping-prices-table {
  color: $black-50;
  display: table;

  & > div {
    display: table-row;
  }

  & > div > div {
    display: table-cell;
  }

  .th {
    text-transform: uppercase;
  }

  .price {
    text-align: right;
  }
}
</style>
