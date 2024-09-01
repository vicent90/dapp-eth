# DApp - Ethereum NFT Interaction

## Overview
This project is a simple Decentralized Application (DApp) that enables users to interact with digital assets (NFTs) on the Ethereum blockchain. The application allows users to connect their Ethereum wallet, view a gallery of their owned NFTs, mint new NFTs, and transfer NFTs to other addresses.

## Project Structure
The project is organized as a monorepo with the following structure:

- **app**: Contains the Vue.js front-end application.
- **api**: Contains the Node.js back-end server, which provides API endpoints to interact with IPFS and other services.
- **contract**: Contains the smart contract (ERC-721) code used for the DApp.

## Features
- **Wallet Connection**: Connect to the Ethereum blockchain using MetaMask.
- **NFT Gallery**: Display NFTs owned by the connected wallet.
- **Minting**: Mint new NFTs by interacting with the provided ERC-721 smart contract.
- **Transfer**: Transfer NFTs to other Ethereum addresses.

## Technologies Used
- **Vue.js**: For building the user interface.
- **Express.js**: As the back-end framework for the API.
- **ethers.js**: To interact with the Ethereum blockchain.
- **IPFS/Pinata**: For storing and retrieving metadata associated with NFTs.
- **Vercel**: For deploying the front-end application.
- **Vercel**: For deploying the back-end application.

## Setup Instructions

### Prerequisites
- **Node.js**: Ensure that Node.js is installed on your machine, preferably version 20 or later.
- **MetaMask**: A MetaMask wallet installed in your browser.

### 1. Clone the Repository
```
git clone https://github.com/vicent90/dapp-eth.git
cd dapp-eth
```

### 2. Install Dependencies
Navigate to the root of the project and install dependencies for both the front-end and back-end:
```
# Install dependencies for the front-end
cd app
npm install

# Install dependencies for the back-end
cd ../api
npm install
```

### 3. Set Up Environment Variables
Create a .env file in the api directory and add the following variables:
```
# .env in api directory
INFURA_PROJECT_ID=your_infura_project_id
INFURA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=your_contract_address
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
PINATA_JWT=your_pinata_jwt
CORS_ALLOWED_ORIGINS=https://yourfrontendurl.com
```

Create a .env file in the app directory and add the following variables:
```
# .env in app directory
VITE_APP_API_URL=https://yourbackendurl.com
```

### 4. Run the Back-End Locally
Start the Node.js server:
```
cd api
npm run dev
```
The API will be available at http://localhost:3000.

### 5. Run the Front-End Locally
Start the Vue.js application:
```
cd app
npm run dev
```
The front-end will be available at http://localhost:5173.

## Assumptions and Decisions
- **Smart Contract**: As per the email update, the smart contract provided in the original instructions was not functional. Instead, an industry-standard ERC-721 contract was used.
- **API URL**: The API URL is set using environment variables to easily switch between development and production environments.
- **MetaMask Integration**: MetaMask was chosen for wallet integration due to its popularity and ease of use.

## Future Enhancements
- **Performance Optimization**: Address the latency in blockchain interactions, particularly for minting, transferring, and fetching NFTs. 
- **Asynchronous Processing**: Explore using asynchronous processing, such as implementing queues, to handle intensive operations more efficiently.
- **Hosting Upgrades**: Consider upgrading the hosting plan to support longer-running tasks and avoid timeout issues during blockchain transactions.
- **Error Handling**: Improve error handling throughout the DApp for better user experience.
- **Testing**: Add unit tests for the smart contract, API, and front-end application.
- **Pagination**: Implement pagination for the NFT gallery to improve performance.
- **Search**: Add a search feature to filter NFTs based on metadata.

## Conclusion
This project demonstrates the integration of blockchain technology into a web application, offering a smooth experience for managing digital assets on the Ethereum network. The implementation follows best practices, ensuring that the code is maintainable and scalable. The key functionalities, including minting, transferring, and viewing NFTs, were successfully developed, highlighting the potential of decentralized applications.

This technical challenge provided an opportunity to apply full-stack development skills within the web3 ecosystem. The project meets the specified objectives while identifying areas for future improvement, laying a strong foundation for ongoing work in blockchain-based projects.
