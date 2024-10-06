import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  accountType: {
    type: String,
    required: true,
    enum: ['Saving', 'Current'],
    default: 'Saving'
  },
  balance: {
    type: Number,
    default: 0
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  }
});

const Account = mongoose.model('Account', accountSchema);
export default Account;
