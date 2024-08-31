<template>
  <div class="relative flex items-center space-x-2 group">
    <span>{{ truncatedAddress }}</span>
    <div class="relative">
      <button
        @click="copyToClipboard"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
        class="text-gray-400 hover:text-gray-200"
      >
        <component :is="copied ? VueClipboardChecked : VueClipboard" class="h-5 w-5" />
      </button>
      <div
        v-if="showTooltip"
        class="absolute z-10 w-32 p-1 text-sm text-white bg-gray-800 rounded shadow-md"
        style="left: 120%"
      >
        {{ tooltipText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBlockchainStore } from '../../stores/blockchain'
import VueClipboard from '../icons/VueClipboard.vue'
import VueClipboardChecked from '../icons/VueClipboardChecked.vue'
const store = useBlockchainStore()
const address = store.address

const truncatedAddress = ref('')
const showTooltip = ref(false)
const tooltipText = ref('Copy to clipboard')
const copied = ref(false)

if (address) {
  truncatedAddress.value = `${address.slice(0, 6)}...${address.slice(-4)}`
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(address)
  tooltipText.value = 'Address copied!'
  copied.value = true
}
</script>
