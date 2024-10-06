import Joi from 'joi';

// Middleware للتحقق من صحة البيانات المدخلة عند تسجيل العميل
export const validateCustomer = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
    address: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    nationalID: Joi.string().required(),
    password: Joi.string().min(6).required(),
    repassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// Middleware للتحقق من صحة بيانات تسجيل الدخول
export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    nationalID: Joi.string().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// Middleware للتحقق من صحة بيانات تغيير كلمة المرور
export const validateChangePassword = (req, res, next) => {
  const schema = Joi.object({
    nationalID: Joi.string().required(),
    password: Joi.string().min(6).required(),
    repassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// Middleware للتحقق من صحة بيانات حذف العميل
export const validateDeleteCustomer = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required()
  });

  const { error } = schema.validate(req.params);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};
export const validateUpdateCustomer = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required()
  });

  const { error } = schema.validate(req.params);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};
