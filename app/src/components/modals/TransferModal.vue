<template>
  <BaseModal :isLoading="isLoading" @close="handleCancelClick" @submit="handleTransfer">
    <template #title>Transfer NFT</template>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">NFT Name</label>
      <p class="text-lg text-gray-800">{{ nftName }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Token ID</label>
      <p class="text-lg text-gray-800">{{ tokenId }}</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="to">Recipient Address</label>
      <input
        v-model="to"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="to"
        type="text"
        placeholder="0x..."
        :disabled="isLoading"
      />
      <p v-if="toError" class="text-xs text-red-600 mt-1">{{ toError }}</p>
    </div>
    <template #loading-text>Transferring...</template>
    <template #button-text>Transfer</template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { useTransferNFT } from '../../composables/useTransferNFT'

const props = defineProps({
  tokenId: {
    type: Number,
    required: true
  },
  nftName: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['close'])
const { to, isLoading, toError, transferNFT } = useTransferNFT(props.tokenId, emit)
const handleCancelClick = () => {
  if (!isLoading.value) {
    emit('close')
  }
}
const handleTransfer = async () => await transferNFT()
</script>
