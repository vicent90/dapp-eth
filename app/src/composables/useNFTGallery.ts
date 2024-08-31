import { ref, watchEffect, watch } from 'vue';
import axios from 'axios';
import { useBlockchainStore } from '../stores/blockchain';

type NFTMetadata = {
  tokenId: number;
  tokenURI: string;
  name: string;
  description: string;
  image: string;
};

export function useNFTGallery() {
  const store = useBlockchainStore();
  const isLoading = ref(true);
  const error = ref('');
  const nftsMetadata = ref<NFTMetadata[]>([]);

  const fetchNFTMetadata = async (nft: NFTMetadata) => {
    try {
      const { data } = await axios.get(nft.tokenURI);
      nft.name = data.name;
      nft.description = data.description;
      nft.image = data.image;
    } catch (err) {
      error.value = 'Failed to load NFT metadata';
    }
  };

  const updateMetadata = async () => {
    const existingMetadata = [...nftsMetadata.value];
    const newMetadata = [];
    const requests = [];
    for (const nft of store.nfts) {
      const existing = existingMetadata.find(m => m.tokenId === nft.tokenId);
      if (existing) {
        newMetadata.push(existing);
      } else {
        const newNft = { tokenId: nft.tokenId, tokenURI: nft.tokenURI, name: '', description: '', image: '' };
        newMetadata.push(newNft);
        requests.push(fetchNFTMetadata(newNft));
      }
    }
    await Promise.all(requests);
    nftsMetadata.value = newMetadata;
  };


  watch(() => store.nfts, async (newNfts) => {
    nftsMetadata.value = nftsMetadata.value.filter(metadata =>
      newNfts.some(nft => nft.tokenId === metadata.tokenId)
    );
    await updateMetadata();
  }, { immediate: true, deep: true });

  watchEffect(async () => {
    if (store.address) {
      isLoading.value = true;
      await store.fetchNFTs();
      if (store.nfts.length > 0) {
        await updateMetadata();
      }
      isLoading.value = false;
    }
  });

  return {
    nftsMetadata,
    isLoading,
    error,
  };
}
