<template>
  <ul class="shopping-list">
    <ShoppingItem
      v-for="(cartItems, index) in cartItem"
      :cart-item="cartItem"
      :key="index"
    >
      <ShoppingButtonQuantity v-if="isCart" class="item-quantity--small" />
      <p v-else>{{ cartItem.quantity }}</p>
    </ShoppingItem>
  </ul>
</template>

<script>
import ShoppingItem from '@/components/ShoppingItem.vue'
import ShoppingButtonQuantity from '@/components/ShoppingButtonQuantity.vue'

export default {
  name: 'ShoppingList',
  props: {
    title: String,
    isCart: Boolean,
  },

  components: {
    ShoppingItem,
    ShoppingButtonQuantity,
  },
}
</script>

<style lang="scss"></style>
