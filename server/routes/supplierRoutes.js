import express from 'express';
import { getProfile, updateProfile } from '../controllers/supplierProfileController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticate, authorize('farmer'), getProfile);
router.put('/profile', authenticate, authorize('farmer'), updateProfile);

export default router;
