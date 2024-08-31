import { ref } from 'vue';
import { useBlockchainStore } from '../stores/blockchain';
import { useToast } from 'vue-toastification'
import isURL from 'validator/lib/isURL';

export function useMintNFT(emit: (event: 'close') => void) {
  const toast = useToast();
  const store = useBlockchainStore();
  const name = ref('');
  const description = ref('');
  const image = ref<string | null>(null);
  const isLoading = ref(false);
  const nameError = ref('');
  const descriptionError = ref('');
  const imageError = ref('');

  const validateFields = () => {
    nameError.value = name.value ? '' : 'Name is required';
    descriptionError.value = description.value ? '' : 'Description is required';
    imageError.value = image.value && isURL(image.value) ? '' : 'A valid image URL is required';

    return !nameError.value && !descriptionError.value && !imageError.value;
  };

  const mint = async () => {
    if (!validateFields()) return;

    isLoading.value = true;
    try {
      await store.mintToken({ name: name.value, description: description.value, image: image.value || '' });
      toast.success('NFT minted successfully');
      emit('close');
    } catch (error) {
      toast.error('Failed to mint NFT');
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    name,
    description,
    image,
    isLoading,
    mint,
    nameError,
    descriptionError,
    imageError,
  };
}
