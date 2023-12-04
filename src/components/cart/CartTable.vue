<template>
  <table class="w-full max-w-screen-xl my-10 mx-auto">
    <thead>
      <CartTableRow :header="true"></CartTableRow>
    </thead>
    <tbody>
      <template v-if="cart.productItems.length">
        <CartTableRow
          v-for="cartItem in cart.productItems"
          :key="cartItem.product.id"
          :cart-item="cartItem"
        ></CartTableRow>
        <tr>
          <td class="font-bold text-right pr-2 text-lg" colspan="10">
            Total: {{ formatPrice(cart.total) }}
          </td>
        </tr>
      </template>
      <tr class="flex" v-else>
        <td class="text-center w-full flex">No items in cart</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import useCart from '@/composables/useCart'
import CartTableRow from '@/components/cart/CartTableRow.vue'
import useUnits from '@/composables/useUnits'

const { formatPrice } = useUnits()
const { cart } = useCart()
</script>
