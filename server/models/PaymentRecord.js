import mongoose from 'mongoose';

const paymentRecordSchema = new mongoose.Schema(
  {
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ['bank_transfer', 'credit_card', 'payment_gateway', 'cash'],
      default: 'payment_gateway',
    },
    transactionId: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

paymentRecordSchema.index({ invoice: 1 });
paymentRecordSchema.index({ transactionId: 1 });

const PaymentRecord = mongoose.model('PaymentRecord', paymentRecordSchema);

export default PaymentRecord;
