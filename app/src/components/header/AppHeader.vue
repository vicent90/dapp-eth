<template>
  <header class="flex justify-between items-center p-4 px-12 bg-gray-800 text-white">
    <div class="text-lg font-bold">DApp NFT</div>
    <AddressDisplay v-if="store.address" />
    <button
      @click="toggleWalletConnection"
      :class="[
        'text-white py-2 px-4 rounded',
        store.address ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-500 hover:bg-teal-600'
      ]"
    >
      {{ store.address ? 'Disconnect' : 'Connect Wallet' }}
    </button>
  </header>
</template>

<script setup>
import { useBlockchainStore } from '../../stores/blockchain'
import AddressDisplay from './AddressDisplay.vue'

const store = useBlockchainStore()
const toggleWalletConnection = () =>
  store.address ? store.disconnectWallet() : store.connectWallet()
</script>
