import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const transactionSchema = new mongoose.Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Deposit', 'Withdrawal', 'Transfer'] // نوع المعاملة: إيداع، سحب، تحويل
  },
  amount: {
    type: Number,
    required: true
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  fromAccount: {
    type: Schema.Types.ObjectId,
    ref: 'Account' // حساب المرسل في حالة التحويل
  },
  toAccount: {
    type: Schema.Types.ObjectId,
    ref: 'Account' // حساب المستلم في حالة التحويل
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
