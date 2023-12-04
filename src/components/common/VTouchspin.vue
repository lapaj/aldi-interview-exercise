<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  minimum: {
    type: Number,
    default: 1,
  },
  maximum: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
  (event: 'isValueValid', valid: boolean): void
}>()

const internalValue = ref(props.modelValue)

function isValidValue(value: number) {
  return value >= props.minimum && value <= props.maximum
}

const showInvalidValue = ref(false)

function handleIncrement(incrementValue: number) {
  if (isValidValue(internalValue.value + incrementValue)) {
    showInvalidValue.value = false
    internalValue.value += incrementValue
    emit('update:modelValue', internalValue.value)
    emit('isValueValid', true)
  }
  else showInvalidValue.value = true
}

function handleInput(value: string) {
  const parsedValue = Number.parseInt(value)
  if (isValidValue(parsedValue)) {
    showInvalidValue.value = false
    internalValue.value = parsedValue
    emit('update:modelValue', internalValue.value)
    emit('isValueValid', true)
  }
  else {
    showInvalidValue.value = true
    emit('isValueValid', false)
  }
}
</script>
<template>
  <div class="flex flex-row" :class="{ 'border-red-500': showInvalidValue }">
    <button
      class="touchspin-button touchspin-button-subtract border-l w-6 border-inherit"
      @click="handleIncrement(-1)"
    >
      -
    </button>
    <input
      class="touchspin-input border w-8 text-center border-inherit"
      type="number"
      :value="internalValue"
      @input="(event) => handleInput((event.target as HTMLInputElement).value)"
      @change="(event) => handleInput((event.target as HTMLInputElement).value)"
    >
    <button
      class="touchspin-button touchspin-button-add border-r w-6 border-inherit"
      @click="handleIncrement(+1)"
    >
      +
    </button>
  </div>
</template>
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
