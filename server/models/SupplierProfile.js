import mongoose from 'mongoose';

const supplierProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    products: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      trim: true,
    },
    fulfillmentCount: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const SupplierProfile = mongoose.model('SupplierProfile', supplierProfileSchema);

export default SupplierProfile;
