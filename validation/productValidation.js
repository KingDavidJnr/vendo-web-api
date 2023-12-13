// validation/productValidation.js
const Joi = require('joi');

// Validation schema for creating a product
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2).positive().required(),
  quantityAvailable: Joi.number().integer().min(0).required(),
  // You can add more fields based on your product requirements
});

// Validation schema for updating a product
const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().precision(2).positive(),
  quantityAvailable: Joi.number().integer().min(0),
  // You can add more fields based on what can be updated
});

// Export the validation schemas
module.exports = {
  productSchema,
  updateProductSchema,
  // ... (other product-related validation schemas, if needed)
};
