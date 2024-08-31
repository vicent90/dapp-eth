import { defineStore } from 'pinia';
import { getNFTs, getLatestNFT, mintNFT, transferNFT, uploadMetadata } from '../services/apiService';
import { ethers } from 'ethers';
import { useToast } from 'vue-toastification';

export const useBlockchainStore = defineStore('blockchain', {
  state: () => ({
    address: localStorage.getItem('address') || '',
    nfts: [] as { tokenId: number; tokenURI: string }[],
  }),
  actions: {
    async connectWallet() {
      const toast = useToast();
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          this.address = await signer.getAddress();
          localStorage.setItem('address', this.address);
        } catch (error) {
          toast.error('Failed to connect to MetaMask');
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        toast.info('MetaMask is not installed!');
        console.log('MetaMask is not installed!');
      }
    },
    disconnectWallet() {
      this.address = '';
      this.nfts = [];
      localStorage.removeItem('address');
    },
    async fetchNFTs() {
      const toast = useToast();
      if (this.address) {
        try {
          const { data: { nfts } } = await getNFTs(this.address);
          this.nfts = nfts.map(nft => ({
            tokenId: Number(nft.tokenId),
            tokenURI: nft.tokenURI
          }));
        } catch (error) {
          toast.error('Failed to fetch NFTs');
          console.error('Error fetching NFTs:', error);
        }
      }
    },
    async mintToken(metadata: { name: string, description: string, image: string }) {
      try {
        const { data: { ipfsUrl } } = await uploadMetadata(metadata);
        const result = await mintNFT(this.address, ipfsUrl);
        console.log('NFT minted:', result);
      } catch (error) {
        throw new Error("Failed to mint NFT");
      } finally {
        const { data: { nft } } = await getLatestNFT(this.address);

        if (nft) {
          this.nfts.push({
            tokenId: Number(nft.tokenId),
            tokenURI: nft.tokenURI
          });
        }
      }
    },
    async transferToken(to: string, tokenId: number) {
      try {
        const result = await transferNFT(this.address, to, tokenId);
        this.nfts = this.nfts.filter(nft => nft.tokenId !== tokenId);;
        console.log('NFT transferred:', result);
      } catch (error) {
        console.error('Error transferring NFT:', error);
      }
    },
  },
});
