<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    default: '',
  },
})

const buttonClasses
  = 'relative inline-block box-content px-5 py-1.5 font-bold rounded-full bg-primary hover:cursor-pointer border border-transparent hover:brightness-110 transition-all'
</script>
<template>
  <RouterLink v-if="to" :to="to" :class="buttonClasses">
    <slot />
  </RouterLink>
  <button
    v-else
    v-bind="$attrs"
    class="disabled:bg-slate-100 disabled:text-slate-400"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>
