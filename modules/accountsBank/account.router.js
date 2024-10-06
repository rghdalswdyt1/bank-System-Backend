import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { createBankAccount, deleteBankAccount, getBankAccountById, getCustomerAccounts } from "./account.controller.js";


const router = Router();

// إنشاء حساب بنكي جديد
router.post('/create', authMiddleware, createBankAccount);

// عرض الحسابات البنكية للعميل
router.get('/accounts', authMiddleware, getCustomerAccounts);

// عرض حساب بنكي محدد
router.get('/account/:accountId', authMiddleware, getBankAccountById);

// حذف حساب بنكي
router.delete('/delete/:accountId', authMiddleware, deleteBankAccount);

export default router;
