// validation/customerValidation.js
const Joi = require('joi');

// Validation schema for customer profile
const customerProfileSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string().pattern(/^[\d-]+$/), // Allows only digits and hyphens
});

// Validation schema for customer purchases
const purchaseSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required(),
});

// Export the validation schemas
module.exports = {
  customerProfileSchema,
  purchaseSchema,
  // ... (other customer-related validation schemas, if needed)
};
