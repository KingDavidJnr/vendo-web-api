// validation/orderValidation.js
const Joi = require('joi');

// Validation schema for creating an order
const orderSchema = Joi.object({
  customerId: Joi.number().integer().positive().required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().required(),
    })
  ).required(),
  // You can add more fields based on your order requirements
});

// Validation schema for updating an order
const updateOrderSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      productId: Joi.number().integer().positive().required(),
      quantity: Joi.number().integer().positive().required(),
    })
  ),
  // You can add more fields based on what can be updated
});

// Export the validation schemas
module.exports = {
  orderSchema,
  updateOrderSchema,
  // ... (other order-related validation schemas, if needed)
};
