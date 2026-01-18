import Order from '../models/Order.js';
import Invoice from '../models/Invoice.js';

export const getOrders = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (req.user.role === 'restaurant') {
      filter.restaurant = req.user._id;
    } else if (req.user.role === 'farmer') {
      filter.supplier = req.user._id;
    }

    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate('restaurant', 'name email')
      .populate('supplier', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (
      (req.user.role === 'restaurant' && order.restaurant.toString() !== req.user._id.toString()) ||
      (req.user.role === 'farmer' && order.supplier.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    order.status = status;
    if (status === 'delivered') {
      order.fulfilledAt = new Date();
    }

    await order.save();

    if (status === 'delivered') {
      const invoice = await Invoice.findOne({ order: order._id });
      if (invoice) {
        invoice.status = 'pending';
        await invoice.save();
      }
    }

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
