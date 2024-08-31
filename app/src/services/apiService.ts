import axios, { type AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3000/api';

type NFT = {
  tokenId: number
  tokenURI: string
}

interface BaseResponse {
  success: boolean;
}

interface MintNFTResponse extends BaseResponse {
  txHash: string;
}

interface TransferNFTResponse extends BaseResponse {
  txHash: string;
}

interface UploadMetadataResponse extends BaseResponse {
  ipfsUrl: string;
}

interface GetNFTsResponse extends BaseResponse {
  nfts: NFT[];
}

interface GetLatestNFTResponse extends BaseResponse {
  nft: NFT;
}

export const mintNFT = async (to: string, tokenURI: string): Promise<AxiosResponse<MintNFTResponse>> => {
  return axios.post<MintNFTResponse>(`${API_URL}/mint`, { to, tokenURI });
};

export const transferNFT = async (from: string, to: string, tokenId: number): Promise<AxiosResponse<TransferNFTResponse>> => {
  return axios.post<TransferNFTResponse>(`${API_URL}/transfer`, { from, to, tokenId });
};

export const uploadMetadata = async (metadata: object): Promise<AxiosResponse<UploadMetadataResponse>> => {
  return axios.post<UploadMetadataResponse>(`${API_URL}/uploadMetadata`, metadata);
};

export const getNFTs = async (address: string): Promise<AxiosResponse<GetNFTsResponse>> => {
  return axios.get<GetNFTsResponse>(`${API_URL}/nfts/${address}`);
};

export const getLatestNFT = async (address: string): Promise<AxiosResponse<GetLatestNFTResponse>> => {
  return axios.get<GetLatestNFTResponse>(`${API_URL}/nfts/${address}/latest`);
};