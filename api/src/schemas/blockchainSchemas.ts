import { body, param } from 'express-validator';

export const mintTokenSchema = [
    body('to').isEthereumAddress().withMessage('Invalid Ethereum address'),
    body('tokenURI').isURL().withMessage('Invalid tokenURI'),
];

export const transferTokenSchema = [
    body('from').isEthereumAddress().withMessage('Invalid Ethereum address'),
    body('to').isEthereumAddress().withMessage('Invalid Ethereum address'),
    body('tokenId').isInt({ gt: 0 }).withMessage('Token ID must be a positive integer'),
];

export const uploadMetadataSchema = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('image').isURL().withMessage('Invalid image URL'),
];

export const getNFTsSchema = [
    param('address').isEthereumAddress().withMessage('Invalid Ethereum address'),
];

export const getLastMintedNFTSchema = [
    param('address').isEthereumAddress().withMessage('Invalid Ethereum address'),
];
