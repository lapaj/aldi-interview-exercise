<template>
  <VPageHeader>Products</VPageHeader>
  <div v-if="!products.length">
    <img class="w-20 h-20 mx-auto" src="@/assets/icons/loading.svg" alt="Loading" />
  </div>
  <div
    v-else
    class="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-10"
    v-if="products?.length"
  >
    <ProductItem v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
<script setup lang="ts">
import VPageHeader from '@/components/common/VPageHeader.vue'
import ProductItem from '@/components/products/ProductItem.vue'
import useProducts from '@/composables/useProducts'
import { ref } from 'vue'
const { products, fetchProducts } = useProducts()

fetchProducts()
</script>
