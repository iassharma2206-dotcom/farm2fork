import mongoose from 'mongoose';

const buyRequestSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    item: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
      trim: true,
    },
    deliveryDate: {
      type: Date,
      required: [true, 'Delivery date is required'],
    },
    status: {
      type: String,
      enum: ['open', 'claimed', 'cancelled'],
      default: 'open',
      index: true,
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    claimedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for queries
buyRequestSchema.index({ status: 1, createdAt: -1 });
buyRequestSchema.index({ restaurant: 1, status: 1 });

const BuyRequest = mongoose.model('BuyRequest', buyRequestSchema);

export default BuyRequest;
