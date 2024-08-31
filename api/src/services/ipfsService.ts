import axios from 'axios';
import { config } from '../config';

export async function uploadMetadataToIPFS(metadata: object, name: string): Promise<string> {
  try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
          pinataContent: metadata,
          pinataOptions: {
              cidVersion: 1,
          },
          pinataMetadata: { name },
      }, {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${config.pinataJwt}`,
          },
      });

      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
      console.error('Error uploading metadata to IPFS:', error);
      throw new Error('Failed to upload metadata to IPFS');
  }
}