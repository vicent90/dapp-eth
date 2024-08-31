<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <a :href="image" target="_blank" rel="noopener noreferrer">
      <img
        :src="image"
        alt="NFT Image"
        class="w-full h-48 object-cover"
        @error="handleImageError"
      />
    </a>
    <div class="p-4">
      <h3 class="text-xl font-bold">{{ name }}</h3>
      <p class="text-gray-600">{{ description }}</p>
      <button
        @click="toggleTransferModal"
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Transfer
      </button>
    </div>
    <TransferModal
      v-if="showTransferModal"
      :tokenId="tokenId"
      :nftName="name"
      @close="toggleTransferModal"
      @transfer="transferNFT"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TransferModal from '../modals/TransferModal.vue'

const props = defineProps({
  tokenId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

const showTransferModal = ref(false)

const placeholderImage = 'https://via.placeholder.com/300x200.png?text=NFT+Image+Not+Available'

const handleImageError = (event: Event) => {
  const imgElement = event.target as HTMLImageElement
  imgElement.src = placeholderImage
}

const toggleTransferModal = () => {
  showTransferModal.value = !showTransferModal.value
}

const transferNFT = (toAddress: string) => {
  console.log(`Transferring NFT ${props.tokenId} to ${toAddress}`)
  toggleTransferModal()
}
</script>
