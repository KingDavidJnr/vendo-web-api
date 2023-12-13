// validation/userValidation.js
const Joi = require('joi');

// Validation schema for user registration
const registrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Export the validation schemas
module.exports = {
  registrationSchema,
  loginSchema,
  // ... (other user-related validation schemas, if needed)
};
