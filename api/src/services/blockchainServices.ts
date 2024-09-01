import { ethers } from 'ethers';
import contractArtifact from '../abi/DappNFT.json';
import { config } from '../config';

const { infuraUrl, infuraProjectId, privateKey, contractAddress } = config;

const provider = new ethers.JsonRpcProvider(`${infuraUrl}/${infuraProjectId}`);
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, contractArtifact.abi, wallet);

export async function mintToken(to: string, tokenURI: string): Promise<string> {
    const tx = await contract.createCollectible(to, tokenURI);
    await tx.wait();
    return tx.hash;
}

export async function transferToken(from: string, to: string, tokenId: bigint): Promise<string> {
    const tx = await contract.safeTransferFrom(from, to, tokenId);
    await tx.wait();
    return tx.hash;
}

export async function getOwnedNFTs(address: string): Promise<{ tokenId: string, tokenURI: string }[]> {
    const nfts = [];
    const totalSupply = await contract.tokenCounter();
    
    for (let tokenId = 0n; tokenId < totalSupply; tokenId++) {
        const owner = await contract.ownerOf(tokenId);
        if (owner.toLowerCase() === address.toLowerCase()) {
            const tokenURI = await contract.tokenURI(tokenId);
            nfts.push({ tokenId: tokenId.toString(), tokenURI });
        }
    }

    return nfts;
}

export async function getLastMintedNFT(address: string): Promise<{ tokenId: string, tokenURI: string } | null> {
    const totalSupply = await contract.tokenCounter();
    const lastTokenId = totalSupply - 1n;
    const owner = await contract.ownerOf(lastTokenId);
    if (owner.toLowerCase() === address.toLowerCase()) {
        const tokenURI = await contract.tokenURI(lastTokenId);
        return { tokenId: lastTokenId.toString(), tokenURI };
    }
    
    return null;
}
