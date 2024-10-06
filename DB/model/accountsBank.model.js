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
    enum: ['Personal account', 'Savings account', 'Business account'], // إضافة الأنواع المختلفة
    default: 'Savings' // الحساب الافتراضي يكون حساب توفير
  },
  isDefault: { // تحديد ما إذا كان هذا الحساب هو الحساب الافتراضي
    type: Boolean,
    default: false
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
