import { Router } from "express";
import { validateChangePassword, validateCustomer, validateDeleteCustomer, validateLogin, validateUpdateCustomer } from "./customer.validation.js";
import { changePassword, createCustomer, deleteCustomer, getCustomerById, loginCustomer, updateCustomer, verifyOTP } from "./customer.controller.js";

const router = Router();

// Route لإنشاء حساب عميل
router.post('/register', validateCustomer, createCustomer);

// Route لتسجيل دخول العميل
router.post('/login',validateLogin, loginCustomer);

// Route لتحديث بيانات العميل
router.put('/update/:id', validateUpdateCustomer, updateCustomer);

// Route لتغيير كلمة المرور
router.put('/change-password',validateChangePassword, changePassword);

// Route لحذف العميل
router.delete('/delete/:id',validateDeleteCustomer, deleteCustomer);
router.get('/customer/:id', getCustomerById);
router.post('/verify-otp', verifyOTP);


export default router;