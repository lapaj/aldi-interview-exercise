<template>
  <VPageHeader>Cart</VPageHeader>
  <VButton to="/products">Back to products</VButton>
  <section>
    <CartTable> </CartTable>
    <VButton> Order </VButton>
  </section>
</template>
<script setup lang="ts">
import VButton from '@/components/common/VButton.vue'
import VPageHeader from '@/components/common/VPageHeader.vue'
import useCart from '@/composables/useCart'
import CartTable from '@/components/cart/CartTable.vue'

const { cart } = useCart()
</script>
