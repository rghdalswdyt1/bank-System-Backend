import Joi from 'joi';

// التحقق من صحة بيانات السحب والإيداع
export const validateTransaction = (req, res, next) => {
  const schema = Joi.object({
    accountNumber: Joi.string().required().messages({
      'string.empty': 'Account number is required.',
    }),
    amount: Joi.number().positive().required().messages({
      'number.base': 'Amount must be a number.',
      'number.positive': 'Amount must be greater than 0.',
      'any.required': 'Amount is required.',
    })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // تحويل المبلغ إلى رقم إذا كان على شكل نص
  if (typeof req.body.amount === 'string') {
    req.body.amount = parseFloat(req.body.amount);
  }

  next();
};

// التحقق من صحة بيانات التحويل
export const validateTransfer = (req, res, next) => {
  const schema = Joi.object({
    fromAccountNumber: Joi.string().required().messages({
      'string.empty': 'From account number is required.',
    }),
    toAccountNumber: Joi.string().required().messages({
      'string.empty': 'To account number is required.',
    }),
    amount: Joi.number().positive().required().messages({
      'number.base': 'Amount must be a number.',
      'number.positive': 'Amount must be greater than 0.',
      'any.required': 'Amount is required.',
    })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // تحويل المبلغ إلى رقم إذا كان على شكل نص
  if (typeof req.body.amount === 'string') {
    req.body.amount = parseFloat(req.body.amount);
  }

  next();
};
