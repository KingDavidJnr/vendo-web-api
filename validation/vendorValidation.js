// validation/vendorValidation.js
const Joi = require('joi');

// Validation schema for vendor profile
const vendorProfileSchema = Joi.object({
  businessName: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string().pattern(/^[\d-]+$/), // Allows only digits and hyphens
});

// Validation schema for product posted by a vendor
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2).positive().required(),
  quantityAvailable: Joi.number().integer().min(0).required(),
});

// Export the validation schemas
module.exports = {
  vendorProfileSchema,
  productSchema,
  // ... (other vendor-related validation schemas, if needed)
};
