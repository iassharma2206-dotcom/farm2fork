import express from 'express';
import { createBuyRequest, getBuyRequests, claimBuyRequest } from '../controllers/buyRequestController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('restaurant'), createBuyRequest);
router.get('/', authenticate, getBuyRequests);
router.post('/:id/claim', authenticate, authorize('farmer'), claimBuyRequest);

export default router;
