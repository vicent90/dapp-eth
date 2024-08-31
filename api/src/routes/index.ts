import { Router } from 'express';
import { mintTokenController, transferTokenController, uploadMetadataController, getLastMintedNFTController, getNFTsController } from '../controllers/blockchainController';
import { validateRequest } from '../middlewares/validateRequest';
import { mintTokenSchema, transferTokenSchema, uploadMetadataSchema, getNFTsSchema, getLastMintedNFTSchema } from '../schemas/blockchainSchemas';

const router = Router();

router.post('/mint', mintTokenSchema, validateRequest, mintTokenController);
router.post('/transfer', transferTokenSchema, validateRequest, transferTokenController);
router.post('/uploadMetadata', uploadMetadataSchema, validateRequest, uploadMetadataController);
router.get('/nfts/:address/latest', getLastMintedNFTSchema, validateRequest, getLastMintedNFTController);
router.get('/nfts/:address', getNFTsSchema, validateRequest, getNFTsController);

export default router;
