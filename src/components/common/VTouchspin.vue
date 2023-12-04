<template>
  <div class="flex flex-row">
    <button class="touchspin-button border-l w-6" @click="incrementValue(-1)">-</button>
    <input
      class="touchspin-input border w-8 text-center"
      type="number"
      :value="value"
      @input="$emit('update:modelValue', value)"
    />
    <button class="touchspin-button border-r w-6" @click="incrementValue(+1)">+</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const value = ref(props.modelValue)

const incrementValue = (amount: number) => {
  if (value.value + amount <= 1) return
  value.value += amount
  emit('update:modelValue', value.value)
}
</script>
<style scoped>
.touchspin-button {
  @apply border-y rounded-sm p-1 font-bold;
}
.touchspin-input {
  -moz-appearance: textfield;
  appearance: textfield;
}
.touchspin-input::-webkit-outer-spin-button,
.touchspin-input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
}
</style>
