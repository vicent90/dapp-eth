import { ref } from 'vue';
import { useBlockchainStore } from '../stores/blockchain';
import { useToast } from 'vue-toastification'

export function useTransferNFT(initialTokenId: number, emit: (event: 'close') => void) {
  const toast = useToast();
  const store = useBlockchainStore();
  const to = ref('');
  const tokenId = ref(initialTokenId);
  const isLoading = ref(false);

  const toError = ref('');
  const tokenIdError = ref('');

  const validateFields = () => {
    let isValid = true;
    if (!to.value || !/^0x[a-fA-F0-9]{40}$/.test(to.value)) {
      toError.value = 'Invalid Ethereum address';
      isValid = false;
    } else {
      toError.value = '';
    }

    if (!tokenId.value || isNaN(Number(tokenId.value))) {
      tokenIdError.value = 'Token ID must be a valid number';
      isValid = false;
    } else {
      tokenIdError.value = '';
    }

    return isValid;
  };

  const transferNFT = async () => {
    if (!validateFields()) {
      return;
    }

    isLoading.value = true;
    try {
      await store.transferToken(to.value, tokenId.value);
      emit('close');
      toast.success('NFT transferred successfully');
    } catch (error) {
      toast.error('Failed to transfer NFT');
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    to,
    tokenId,
    isLoading,
    toError,
    tokenIdError,
    transferNFT,
  };
}
