<template>
  <VButton to="/cart" class="flex gap-x-2 w-auto">
    <img src="@/assets/icons/cart-shopping-solid.svg" alt="Cart" />
    <span class="hidden sm:block">{{ formatPrice(cart.total) }}</span>
    <span
      v-if="cart.productItems.length"
      class="cart-amount text-[10px] absolute w-4 h-4 -top-1 -right-1 block rounded-full text-white bg-red-500 text-center"
      >{{ cart.productItems.length }}</span
    >
  </VButton>
</template>
<script setup lang="ts">
import VButton from '@/components/common/VButton.vue'
import useCart from '@/composables/useCart'
import useUnits from '@/composables/useUnits'

const { formatPrice } = useUnits()
const { cart } = useCart()
</script>
