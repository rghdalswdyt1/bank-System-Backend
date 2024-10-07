import Account from "../../DB/model/accountsBank.model.js";
import Customer from "../../DB/model/customer.model.js";


// إنشاء حساب بنكي جديد
export const createBankAccount = async (req, res,next) => {
  try {
    const { accountType } = req.body; // نوع الحساب (Saving, Current)
    const customerId = req.customer.id; // الحصول على ID العميل من الـ JWT Token

    // التأكد من أن العميل موجود
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // توليد رقم حساب بنكي عشوائي
    const accountNumber = Math.floor(Math.random() * 1000000000);

    // إنشاء الحساب البنكي
    const newAccount = new Account({
      customer: customer._id,
      accountType: accountType || 'Saving', // افتراضيًا حساب توفير إذا لم يتم تحديد نوع الحساب
      balance: 0,
      accountNumber: accountNumber
    });

    // حفظ الحساب البنكي في قاعدة البيانات
    await newAccount.save();

    res.status(201).json({
      message: 'New bank account created successfully',
      accountNumber: accountNumber,
      accountType: newAccount.accountType,
      balance: newAccount.balance
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating bank account', error });
  }
};
// عرض الحسابات البنكية للعميل
export const getCustomerAccounts = async (req, res) => {
    try {
      const customerId = req.customer.id; // الحصول على ID العميل من الـ JWT Token
  
      // البحث عن جميع الحسابات المرتبطة بالعميل مع عرض بيانات العميل
      const accounts = await Account.find({ customer: customerId })
        .populate('customer', 'name email phone'); // عرض الحقول المطلوبة من العميل
  
      if (!accounts || accounts.length === 0) {
        return res.status(404).json({ message: 'No bank accounts found' });
      }
  
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bank accounts', error });
    }
  };
  
// حذف حساب بنكي
export const deleteBankAccount = async (req, res) => {
    try {
      const { accountId } = req.params; // الحصول على ID الحساب من الـ URL
      const customerId = req.customer.id; // الحصول على ID العميل من الـ JWT Token
  
      // التأكد من أن الحساب ينتمي للعميل المسجل الدخول
      const account = await Account.findOne({ _id: accountId, customer: customerId });
  
      if (!account) {
        return res.status(404).json({ message: 'Account not found or not authorized' });
      }
  
      // حذف الحساب البنكي
      await Account.findByIdAndDelete(accountId);
  
      res.status(200).json({ message: 'Bank account deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting bank account', error });
    }
  };
// عرض حساب بنكي محدد بناءً على accountId
export const getBankAccountById = async (req, res) => {
    try {
      const { accountId } = req.params; // الحصول على معرف الحساب من الـ URL
      const customerId = req.customer.id; // الحصول على معرف العميل من الـ JWT Token
  
      // البحث عن الحساب البنكي باستخدام accountId والتأكد من أنه ملك للعميل
      const account = await Account.findOne({ _id: accountId, customer: customerId })
        .populate('customer', 'name email phone'); // عرض الحقول المطلوبة من العميل
  
      if (!account) {
        return res.status(404).json({ message: 'Account not found or not authorized' });
      }
  
      // إعادة الحساب البنكي
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bank account', error });
    }
  };
  export const getDefaultBankAccount = async (req, res) => {
    try {
      const customerId = req.customer.id;
  
      // البحث عن الحساب الافتراضي مع بيانات العميل
      const defaultAccount = await Account.findOne({ customer: customerId, isDefault: true })
        .populate('customer'); // استخدام populate لجلب بيانات العميل
  
      if (!defaultAccount) {
        return res.status(404).json({ message: 'No default bank account found' });
      }
  
      res.status(200).json(defaultAccount);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching default bank account', error });
    }
  };
  