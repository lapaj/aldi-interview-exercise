<script setup lang="ts">
import VPageHeader from '@/components/common/VPageHeader.vue'
import ProductItem from '@/components/products/ProductItem.vue'
import useProducts from '@/composables/useProducts'

const { products, fetchProducts } = useProducts()

const { isLoading } = fetchProducts()
</script>
<template>
  <VPageHeader>Products</VPageHeader>
  <div v-if="isLoading" class="products-loading">
    <img
      class="w-20 h-20 mx-auto"
      src="@/assets/icons/loading.svg"
      alt="Loading"
    >
  </div>
  <div
    v-else-if="products?.length"
    class="products-list flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-10"
  >
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      class="after:w-1/2 after:h-[1px] after:bg-slate-700 after:mx-auto after:my-8 sm:after:hidden"
    />
  </div>
  <div v-else class="products-none text-center text-lg">
    Products are unavailable at the moment
  </div>
</template>
