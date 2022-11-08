const Joi = require('joi');

const registerValidationSchema = Joi.object({
  username: Joi.string().min(2).max(30).required(),
  email: Joi.string().max(100).required().email(),
  password: Joi.string().min(5).max(50).required(),
  address: Joi.string().max(200),
});

module.exports = { registerValidationSchema };
