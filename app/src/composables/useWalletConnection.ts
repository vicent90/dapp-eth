import { onMounted, ref, watch } from 'vue';
import { useBlockchainStore } from '../stores/blockchain';

export function useWalletConnection() {
  const store = useBlockchainStore();
  const isConnected = ref(store.address !== '');

  const updateConnectionStatus = () => {
    isConnected.value = !!store.address;
  };

  onMounted(async () => {
    if (window.ethereum && localStorage.getItem('address')) {
      await store.connectWallet();
    }
    updateConnectionStatus();
  });

  watch(
    () => store.address,
    () => {
      updateConnectionStatus();
    }
  );

  return {
    store,
    isConnected,
  };
}
