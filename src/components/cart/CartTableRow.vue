<template>
  <tr v-if="header" class="cart-table-row text-lg td:p-1">
    <th class="w-[70px] md:w-[100px]"><!-- Image --></th>
    <th class="text-left w-auto font-bold">Name</th>
    <th class="hidden md:table-cell text-left w-auto font-bold">Unit price</th>
    <th class="text-left font-bold w-auto">Amount</th>
    <th class="text-left font-bold w-auto">Price</th>
    <th class="text-right font-bold w-8">&nbsp;<!-- Delete --></th>
  </tr>
  <tr v-else-if="cartItem" class="cart-table-row">
    <td>
      <img class="w-[100px] h-auto" :src="cartItem.product.img" alt="" />
    </td>
    <td>{{ cartItem.product.name }}</td>
    <td class="hidden md:table-cell">{{ formatPrice(cartItem.product.price) }}/{{ amount }}</td>
    <td>
      <VTouchspin v-model="cartItem.amount"></VTouchspin>
    </td>
    <td>
      {{ formatPrice(cartItem.totalPrice) }}
    </td>
    <td class="p-2 text-right">
      <VButton class="text-red-500 bg-transparent" @click="removeFromCart(cartItem)">╳</VButton>
    </td>
  </tr>
</template>
<script setup lang="ts">
import type { CartItem } from '@/types'
import { type PropType } from 'vue'
import VTouchspin from '@/components/common/VTouchspin.vue'
import VButton from '@/components/common/VButton.vue'
import useUnits from '@/composables/useUnits'
import useCart from '@/composables/useCart'

const { amount, formatPrice } = useUnits()
const { removeFromCart } = useCart()

defineProps({
  cartItem: {
    type: Object as PropType<CartItem>,
    default: null
  },
  header: {
    type: Boolean,
    default: false
  }
})
</script>
<style scoped>
.cart-table-row th,
.cart-table-row td {
  @apply p-2
}
</style>
