import axios, { type AxiosResponse } from 'axios';
import { config } from '../config';

const { apiUrl } = config;

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
  return axios.post<MintNFTResponse>(`${apiUrl}/mint`, { to, tokenURI });
};

export const transferNFT = async (from: string, to: string, tokenId: number): Promise<AxiosResponse<TransferNFTResponse>> => {
  return axios.post<TransferNFTResponse>(`${apiUrl}/transfer`, { from, to, tokenId });
};

export const uploadMetadata = async (metadata: object): Promise<AxiosResponse<UploadMetadataResponse>> => {
  return axios.post<UploadMetadataResponse>(`${apiUrl}/uploadMetadata`, metadata);
};

export const getNFTs = async (address: string): Promise<AxiosResponse<GetNFTsResponse>> => {
  return axios.get<GetNFTsResponse>(`${apiUrl}/nfts/${address}`);
};

export const getLatestNFT = async (address: string): Promise<AxiosResponse<GetLatestNFTResponse>> => {
  return axios.get<GetLatestNFTResponse>(`${apiUrl}/nfts/${address}/latest`);
};