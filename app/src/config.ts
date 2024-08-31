export const config = {
  apiUrl: process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
  infuraUrl: process.env.VUE_APP_INFURA_URL || 'https://sepolia.infura.io/v3',
  infuraProjectId: process.env.VUE_APP_INFURA_PROJECT_ID || 'YOUR_INFURA_PROJECT_ID',
  contractAddress: process.env.VUE_APP_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS',
};
