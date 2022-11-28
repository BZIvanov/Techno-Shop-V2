const Joi = require('joi');

const createCategoryValidationSchema = Joi.object({
  name: Joi.string().trim(true).min(2).max(32).required(),
});

module.exports = {
  createCategoryValidationSchema,
};
