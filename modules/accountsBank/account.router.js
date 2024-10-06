import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { createBankAccount, deleteBankAccount, getBankAccountById, getCustomerAccounts, getDefaultBankAccount } from "./account.controller.js";

const router = Router();

// إنشاء حساب بنكي جديد
router.post('/create', authMiddleware, createBankAccount);

// عرض جميع الحسابات البنكية للعميل
router.get('/accounts', authMiddleware, getCustomerAccounts);

// عرض الحساب البنكي الافتراضي للعميل
router.get('/default-account', authMiddleware, getDefaultBankAccount);

// عرض حساب بنكي محدد
router.get('/account/:accountId', authMiddleware, getBankAccountById);

// حذف حساب بنكي
router.delete('/delete/:accountId', authMiddleware, deleteBankAccount);

export default router;
