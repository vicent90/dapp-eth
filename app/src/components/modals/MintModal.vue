<template>
  <BaseModal :isLoading="isLoading" @close="handleCancelClick" @submit="handleMint">
    <template #title>Mint a New NFT</template>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">NFT Name</label>
      <input
        v-model="name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Enter NFT name"
        :disabled="isLoading"
      />
      <p v-if="nameError" class="text-xs text-red-600 mt-1">{{ nameError }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="description"
        >Description</label
      >
      <textarea
        v-model="description"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="description"
        placeholder="Enter NFT description"
        :disabled="isLoading"
      ></textarea>
      <p v-if="descriptionError" class="text-xs text-red-600 mt-1">{{ descriptionError }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="image">Image URL</label>
      <input
        v-model="image"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="image"
        type="text"
        placeholder="Enter image URL or select an image"
        :disabled="isLoading"
      />
      <p v-if="imageError" class="text-xs text-red-600 mt-1">{{ imageError }}</p>
    </div>
    <template #loading-text>Minting...</template>
    <template #button-text>Mint NFT</template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { useMintNFT } from '../../composables/useMintNFT'

const emit = defineEmits(['close'])
const { name, description, image, isLoading, mint, nameError, descriptionError, imageError } =
  useMintNFT(emit)
const handleCancelClick = () => {
  if (!isLoading.value) {
    emit('close')
  }
}

const handleMint = async () => await mint()
</script>
