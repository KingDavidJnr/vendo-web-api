// validation/userValidation.js
const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('vendor', 'customer').required(), // Adjust roles based on application
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  userRegistrationValidation: (data) => userRegistrationSchema.validate(data),
  userLoginValidation: (data) => userLoginSchema.validate(data),
};
