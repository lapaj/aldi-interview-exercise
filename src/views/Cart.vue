<script setup lang="ts">
import VButton from '@/components/common/VButton.vue'
import VPageHeader from '@/components/common/VPageHeader.vue'
import CartTable from '@/components/cart/CartTable.vue'
import useCart from '@/composables/useCart'

const { clearCart, cartItemCount } = useCart()
</script>
<template>
  <VPageHeader>Cart</VPageHeader>
  <VButton to="/products">
    Back to products
  </VButton>
  <section>
    <CartTable />
    <div v-if="cartItemCount" class="flex flex-row justify-end gap-x-4">
      <VButton class="bg-transparent border-black" @click="clearCart()">
        Clear cart
      </VButton>
      <VButton>Order</VButton>
    </div>
  </section>
</template>
