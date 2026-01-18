import express from 'express';
import { getOrders, updateOrderStatus } from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getOrders);
router.patch('/:id/status', authenticate, updateOrderStatus);

export default router;
