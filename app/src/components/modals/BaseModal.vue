<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
    @click.self="handleOutsideClick"
  >
    <div class="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg relative">
      <h2 class="text-2xl font-bold text-center mb-4">
        <slot name="title"></slot>
      </h2>
      <form @submit.prevent="handleSubmit" class="flex-grow flex flex-col">
        <slot></slot>
        <div class="mt-auto flex space-x-4">
          <button
            type="button"
            class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            @click="handleCancelClick"
            :disabled="isLoading"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          >
            Cancel
          </button>
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            :disabled="isLoading"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <slot name="loading-text"></slot>
              <div
                class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white ml-2"
              ></div>
            </span>
            <span v-else>
              <slot name="button-text"></slot>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])
const handleOutsideClick = () => {
  if (!props.isLoading) {
    emit('close')
  }
}
const handleCancelClick = () => {
  if (!props.isLoading) {
    emit('close')
  }
}
const handleSubmit = () => {
  emit('submit')
}
</script>
