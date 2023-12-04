<script setup lang="ts">
import VButton from '@/components/common/VButton.vue'
import useCart from '@/composables/useCart'
import useUnits from '@/composables/useUnits'

const { formatPrice } = useUnits()
const { cartTotal, cartItemCount } = useCart()
</script>
<template>
  <VButton
    to="/cart"
    class="global-cart-button flex gap-x-2 w-auto"
    :data-total="cartTotal"
    :data-item-count="cartItemCount"
  >
    <img src="@/assets/icons/cart-shopping-solid.svg" alt="Cart">
    <span class="hidden sm:block">{{ formatPrice(cartTotal) }}</span>
    <span
      v-if="cartItemCount"
      class="cart-amount text-[10px] absolute w-4 h-4 -top-1 -right-1 block rounded-full text-white bg-red-500 text-center"
    >{{ cartItemCount }}</span>
  </VButton>
</template>
