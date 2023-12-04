<template>
  <RouterLink v-if="to" :to="to" :class="buttonClasses">
    <slot />
  </RouterLink>
  <button v-else :class="buttonClasses">
    <slot />
  </button>
</template>
<script lang="ts" setup>
const buttonClasses =
  'relative inline-block box-content px-5 py-2 font-bold rounded-full bg-primary hover:cursor-pointer'

defineProps({
  to: {
    type: String,
    default: ''
  }
})
</script>
