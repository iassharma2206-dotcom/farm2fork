import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    buyRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BuyRequest',
      required: true,
      unique: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    item: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'],
      default: 'pending',
      index: true,
    },
    fulfilledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
orderSchema.index({ restaurant: 1, status: 1 });
orderSchema.index({ supplier: 1, status: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
