// validation/reviewValidation.js
const Joi = require('joi');

// Validation schema for creating a review
const reviewSchema = Joi.object({
  customerId: Joi.number().integer().positive().required(),
  productId: Joi.number().integer().positive().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(500), // You can customize the maximum length
  // You can add more fields based on your review requirements
});

// Validation schema for updating a review
const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string().max(500), // You can customize the maximum length
  // You can add more fields based on what can be updated
});

// Export the validation schemas
module.exports = {
  reviewSchema,
  updateReviewSchema,
  // ... (other review-related validation schemas, if needed)
};
