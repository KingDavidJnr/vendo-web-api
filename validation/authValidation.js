// validation/authValidation.js
const Joi = require('joi');

// Validation schema for JWT token
const jwtTokenSchema = Joi.object({
  authorization: Joi.string().required(),
});

// Export the validation schema
module.exports = {
  jwtTokenSchema,
  // ... (other authentication-related validation schemas, if needed)
};
