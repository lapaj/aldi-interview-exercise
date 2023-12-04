<script setup lang="ts">
import type { PropType } from 'vue'
import ProductAddToCart from './ProductAddToCart.vue'
import type { Product } from '@/types'
import useUnits from '@/composables/useUnits'

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const { formatPrice } = useUnits()
</script>
<template>
  <article
    class="product-item flex flex-col"
    :data-product-id="product.id"
    :data-product-price="product.price"
    :data-product-available="product.availableAmount"
    :data-product-minimum="product.minOrderAmount"
  >
    <img
      :src="product.img"
      class="max-h-[200px] w-auto mx-auto mb-auto"
      alt=""
    >
    <div class="flex flex-row justify-between pb-2">
      <h3 class="font-bold mt-auto">
        {{ product.name }}
      </h3>
      <p class="product-price">
        {{ formatPrice(product.price) }}
      </p>
    </div>
    <ProductAddToCart :product="product" />
  </article>
</template>
