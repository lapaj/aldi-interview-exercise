<script setup lang="ts">
import { type PropType, computed, ref } from 'vue'
import VTouchspin from '../common/VTouchspin.vue'
import VButton from '../common/VButton.vue'
import type { Product } from '@/types'
import useCart from '@/composables/useCart'
import useUnits from '@/composables/useUnits'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})
const { amount } = useUnits()
const { addToCart, removeProductFromCart, getCartItem, isProductInCart }
  = useCart()

const disableButton = ref(false)

const orderAmount = ref(props.product.minOrderAmount)

const cartItem = computed(() => getCartItem(props.product))

const amountModel = computed({
  get: () => {
    if (cartItem.value)
      return cartItem.value.amount

    return orderAmount.value
  },
  set: (value) => {
    if (cartItem.value)
      cartItem.value.amount = value

    orderAmount.value = value
  },
})

const availableAmountMinusCartAmount = computed(() => {
  if (cartItem.value)
    return props.product.availableAmount - cartItem.value.amount

  return props.product.availableAmount
})
</script>
<template>
  <div class="flex flex-row justify-between">
    <p class="product-minimum-order pb-2">
      Minimum: {{ product.minOrderAmount }} {{ amount }}
    </p>
    <p class="product-in-stock">
      {{ availableAmountMinusCartAmount }} {{ amount }} in stock
    </p>
  </div>
  <div class="flex flex-row justify-end gap-x-4 items-center">
    <VTouchspin
      v-model="amountModel"
      :minimum="product.minOrderAmount"
      :maximum="product.availableAmount"
      @is-value-valid="(value) => (disableButton = !value)"
    />
    <VButton
      v-if="!isProductInCart(product)"
      class="product-add-to-cart"
      :disabled="disableButton"
      @click="addToCart(product, amountModel)"
    >
      Add to cart
    </VButton>
    <VButton
      v-else
      class="border bg-transparent text-red-500"
      @click="removeProductFromCart(product)"
    >
      ╳
    </VButton>
  </div>
</template>
