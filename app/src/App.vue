<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <AppHeader class="w-full" />
    <div class="container mx-auto flex flex-col items-center space-y-8 py-8">
      <div v-if="store.address" class="w-full">
        <div
          class="flex justify-center items-center w-full mb-8 bg-blue-200 p-8 rounded-lg relative min-h-20"
        >
          <h2 class="text-3xl font-bold absolute left-1/2 transform -translate-x-1/2">My NFTs</h2>
          <button
            @click="toggleMintModal"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute right-8"
          >
            Mint NFT
          </button>
        </div>
        <NFTGallery />
      </div>
      <div v-else class="text-center text-gray-700 font-bold text-2xl">
        Please connect your wallet to view your NFTs.
      </div>
    </div>
    <MintModal v-if="showMintModal" @close="toggleMintModal" />
  </div>
</template>

<script setup>
import AppHeader from './components/header/AppHeader.vue'
import NFTGallery from './components/body/NFTGallery.vue'
import MintModal from './components/modals/MintModal.vue'
import { ref } from 'vue'
import { useBlockchainStore } from './stores/blockchain'

const store = useBlockchainStore()
const showMintModal = ref(false)
const toggleMintModal = () => (showMintModal.value = !showMintModal.value)
</script>
