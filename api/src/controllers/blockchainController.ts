import { Request, Response } from 'express';
import { getLastMintedNFT, getOwnedNFTs, mintToken, transferToken } from '../services/blockchainServices';
import { uploadMetadataToIPFS } from '../services/ipfsService';
import { handleError } from '../utils/handleError';

export async function mintTokenController(req: Request, res: Response): Promise<void> {
    const { to, tokenURI } = req.body;
    try {
        const txHash = await mintToken(to, tokenURI);
        res.json({ success: true, txHash });
    } catch (error) {
        handleError(error, res);
    }
}

export async function transferTokenController(req: Request, res: Response): Promise<void> {
    const { from, to, tokenId } = req.body;
    try {
        const txHash = await transferToken(from, to, tokenId);
        res.json({ success: true, txHash });
    } catch (error) {
        handleError(error, res);
    }
}

export async function uploadMetadataController(req: Request, res: Response): Promise<void> {
    const metadata = req.body;
    try {
        const fileName = `${metadata.name || 'default'}.metadata.json`;
        const ipfsUrl = await uploadMetadataToIPFS(metadata, fileName);
        res.json({ success: true, ipfsUrl });
    } catch (error) {
        handleError(error, res);
    }
}

export async function getNFTsController(req: Request, res: Response): Promise<void> {
    const { address } = req.params;
    try {
        const nfts = await getOwnedNFTs(address);
        res.json({ success: true, nfts });
    } catch (error) {
        handleError(error, res);
    }
}

export async function getLastMintedNFTController(req: Request, res: Response): Promise<void> {
    const { address } = req.params;
    try {
        const nft = await getLastMintedNFT(address);
        res.json({ success: true, nft });
    } catch (error) {
        handleError(error, res);
    }
}