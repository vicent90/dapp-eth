<template>
  <div class="container mx-auto">
    <div v-if="isLoading" class="text-center text-gray-500">Loading NFTs...</div>
    <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
    <div
      v-else-if="nftsMetadata.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <NFTCard
        v-for="nft in nftsMetadata"
        :key="nft.tokenId"
        :tokenId="nft.tokenId"
        :name="nft.name"
        :description="nft.description"
        :image="nft.image"
      />
    </div>
    <div v-else class="text-center text-gray-500">You don't own any NFTs yet.</div>
  </div>
</template>

<script setup lang="ts">
import { useNFTGallery } from '../../composables/useNFTGallery'
import NFTCard from './NFTCard.vue'

const { nftsMetadata, isLoading, error } = useNFTGallery()
</script>
