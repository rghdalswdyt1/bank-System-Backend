import Account from '../../DB/model/accountsBank.model.js';
import Transaction from '../../DB/model/Transaction.model.js';

// Function للسحب باستخدام accountNumber
export const withdraw = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    // البحث عن الحساب باستخدام accountNumber
    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // التحقق من الرصيد
    if (account.balance === 0 || account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // خصم المبلغ من الحساب
    account.balance -= amount;
    await account.save();

    // تسجيل المعاملة
    const transaction = new Transaction({
      account: account._id,
      type: 'Withdrawal',
      amount
    });

    await transaction.save();

    res.status(200).json({
      message: 'Withdrawal successful',
      balance: account.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing withdrawal', error });
  }
};

// Function للإيداع باستخدام accountNumber
export const deposit = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    // البحث عن الحساب باستخدام accountNumber
    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // إضافة المبلغ إلى الحساب
    account.balance += amount;
    await account.save();

    // تسجيل المعاملة
    const transaction = new Transaction({
      account: account._id,
      type: 'Deposit',
      amount
    });

    await transaction.save();

    res.status(200).json({
      message: 'Deposit successful',
      balance: account.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing deposit', error });
  }
};

// Function للتحويل باستخدام accountNumber
export const transfer = async (req, res) => {
  try {
    const { fromAccountNumber, toAccountNumber, amount } = req.body;

    // البحث عن الحساب المرسل باستخدام fromAccountNumber
    const fromAccount = await Account.findOne({ accountNumber: fromAccountNumber });
    if (!fromAccount) {
      return res.status(404).json({ message: 'The account you want to send to does not exist.' });
    }

    // البحث عن الحساب المستلم باستخدام toAccountNumber
    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });
    if (!toAccount) {
      return res.status(404).json({ message: 'Your account not exist' });
    }

    // التحقق من وجود رصيد كافٍ
    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance for transfer' });
    }

    // خصم المبلغ من الحساب المرسل
    fromAccount.balance -= amount;
    await fromAccount.save();

    // إضافة المبلغ إلى الحساب المستلم
    toAccount.balance += amount;
    await toAccount.save();

    // تسجيل المعاملات للطرفين
    const fromTransaction = new Transaction({
      account: fromAccount._id,
      type: 'Transfer',
      amount,
      toAccount: toAccount._id
    });
    const toTransaction = new Transaction({
      account: toAccount._id,
      type: 'Transfer',
      amount,
      fromAccount: fromAccount._id
    });

    await fromTransaction.save();
    await toTransaction.save();

    res.status(200).json({
      message: 'Transfer successful',
      fromAccountBalance: fromAccount.balance,
      toAccountBalance: toAccount.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing transfer', error });
  }
};
