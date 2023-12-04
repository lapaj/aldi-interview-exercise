<script setup lang="ts">
import { RouterView } from 'vue-router'
import CartButton from '@/components/cart/CartButton.vue'
</script>
<template>
  <header class="sticky top-0 border-b bg-white shadow-md p-5 z-10">
    <div class="flex flex-row justify-between">
      <RouterLink to="/products" class="text-2xl font-bold">
        Wunderbar Wares
      </RouterLink>
      <CartButton />
    </div>
  </header>
  <main class="relative pb-10 px-5 md:px-8 leading-normal">
    <RouterView />
  </main>
</template>
