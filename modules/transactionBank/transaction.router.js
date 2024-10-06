import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { deposit, transfer, withdraw } from "./transaction.controller.js";

const router = Router();

// Route للسحب
router.post('/withdraw', authMiddleware, withdraw);

// Route للإيداع
router.post('/deposit', authMiddleware, deposit);

// Route للتحويل
router.post('/transfer', authMiddleware, transfer);

export default router;
