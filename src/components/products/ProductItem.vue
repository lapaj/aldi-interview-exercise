<template>
  <article class="flex flex-col">
    <img :src="product.img" class="max-h-[200px] w-auto mx-auto" alt="" />
    <h3 class="font-bold mt-auto">{{ product.name }}</h3>
    <div class="flex flex-row justify-between pb-2">
      <p>{{ formatPrice(product.price) }}</p>
      <p>{{ product.availableAmount }} {{ amount }} in stock</p>
    </div>
    <div class="flex flex-row justify-between">
      <VTouchspin v-model="orderAmount" />
      <VButton @click="addItemToCart(product)">Add to cart</VButton>
    </div>
  </article>
</template>
<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { Product } from '@/types'
import useCart from '@/composables/useCart'
import VTouchspin from '@/components/common/VTouchspin.vue'
import VButton from '@/components/common/VButton.vue'
import useUnits from '@/composables/useUnits'

const { amount, formatPrice } = useUnits()
const { addToCart } = useCart()

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

const orderAmount = ref(props.product.minOrderAmount)

const addItemToCart = (product: Product) => {
  addToCart(product, orderAmount.value)
}
</script>
