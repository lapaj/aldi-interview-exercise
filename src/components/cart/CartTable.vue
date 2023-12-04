<script setup lang="ts">
import useCart from '@/composables/useCart'
import CartTableRow from '@/components/cart/CartTableRow.vue'
import useUnits from '@/composables/useUnits'

const { formatPrice } = useUnits()
const { cart, cartItemCount, cartTotal } = useCart()
</script>
<template>
  <table v-if="cartItemCount" class="w-full max-w-screen-xl my-10 mx-auto">
    <thead>
      <CartTableRow :header="true" />
    </thead>
    <tbody>
      <CartTableRow
        v-for="[_itemKey, cartItem] in cart.productItems"
        :key="cartItem.product.id"
        :cart-item="cartItem"
      />
      <tr>
        <td class="font-bold text-right pr-2 text-lg" colspan="10">
          Total: {{ formatPrice(cartTotal) }}
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else class="text-center text-lg w-full">
    No items in cart.
  </p>
</template>
