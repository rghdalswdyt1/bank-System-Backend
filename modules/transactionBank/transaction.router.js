import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { deposit, transfer, withdraw, getMyTransactions, getIncomingTransfers } from "./transaction.controller.js";
import { validateTransaction, validateTransfer } from "./transaction.validate.js";

const router = Router();

// Route للسحب مع التحقق من البيانات
router.post('/withdraw', authMiddleware, validateTransaction, withdraw);

// Route للإيداع مع التحقق من البيانات
router.post('/deposit', authMiddleware, validateTransaction, deposit);

// Route للتحويل مع التحقق من البيانات
router.post('/transfer', authMiddleware, validateTransfer, transfer);

// Route للحصول على جميع العمليات التي أجريتها
router.get('/my-transactions', authMiddleware, getMyTransactions);

// Route للحصول على جميع عمليات التحويل الواردة إليك
router.get('/incoming-transfers', authMiddleware, getIncomingTransfers);

export default router;
