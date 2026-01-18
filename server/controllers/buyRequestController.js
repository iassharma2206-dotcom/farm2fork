import BuyRequest from '../models/BuyRequest.js';
import Order from '../models/Order.js';
import Invoice from '../models/Invoice.js';
import SupplierProfile from '../models/SupplierProfile.js';
import { getRecommendations } from '../services/recommendationService.js';

export const createBuyRequest = async (req, res, next) => {
  try {
    const { item, quantity, deliveryDate } = req.body;

    if (!item || !quantity || !deliveryDate) {
      return res.status(400).json({ error: 'Item, quantity, and delivery date are required' });
    }

    const buyRequest = await BuyRequest.create({
      restaurant: req.user._id,
      item,
      quantity,
      deliveryDate: new Date(deliveryDate),
      status: 'open',
    });

    const populatedRequest = await BuyRequest.findById(buyRequest._id)
      .populate('restaurant', 'name email');

    res.status(201).json({
      success: true,
      data: populatedRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const getBuyRequests = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (req.user.role === 'restaurant') {
      filter.restaurant = req.user._id;
    }

    if (status) {
      filter.status = status;
    }

    const requests = await BuyRequest.find(filter)
      .populate('restaurant', 'name email')
      .populate('claimedBy', 'name email')
      .sort({ createdAt: -1 });

    const requestsWithRecommendations = await Promise.all(
      requests.map(async (req) => {
        if (req.status === 'open') {
          const recommendations = await getRecommendations(req);
          return { ...req.toObject(), recommendations };
        }
        return req.toObject();
      })
    );

    res.json({
      success: true,
      data: requestsWithRecommendations,
    });
  } catch (error) {
    next(error);
  }
};

export const claimBuyRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const buyRequest = await BuyRequest.findById(id);
    if (!buyRequest) {
      return res.status(404).json({ error: 'Buy request not found' });
    }

    if (buyRequest.status !== 'open') {
      return res.status(400).json({ error: 'Request is not available for claiming' });
    }

    if (buyRequest.restaurant.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot claim your own request' });
    }

    buyRequest.status = 'claimed';
    buyRequest.claimedBy = req.user._id;
    buyRequest.claimedAt = new Date();
    await buyRequest.save();

    const order = await Order.create({
      buyRequest: buyRequest._id,
      restaurant: buyRequest.restaurant,
      supplier: req.user._id,
      item: buyRequest.item,
      quantity: buyRequest.quantity,
      deliveryDate: buyRequest.deliveryDate,
      status: 'pending',
    });

    const invoiceNumber = `INV-${Date.now()}-${order._id.toString().slice(-6)}`;
    await Invoice.create({
      order: order._id,
      restaurant: buyRequest.restaurant,
      supplier: req.user._id,
      invoiceNumber,
      amount: 0,
      status: 'pending',
      dueDate: buyRequest.deliveryDate,
    });

    await SupplierProfile.findOneAndUpdate(
      { user: req.user._id },
      { $inc: { totalOrders: 1 } },
      { upsert: true }
    );

    const populatedOrder = await Order.findById(order._id)
      .populate('restaurant', 'name email')
      .populate('supplier', 'name email');

    res.json({
      success: true,
      data: populatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
