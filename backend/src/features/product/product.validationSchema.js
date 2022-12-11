const Joi = require('joi');

const productValidationSchema = Joi.object({
  title: Joi.string().trim(true).min(2).max(32).required(),
  description: Joi.string().max(2000).required(),
  price: Joi.number().positive().min(0.01).required(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid id')
    .required(),
  subcategories: Joi.array().items(
    Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid id')
  ),
  quantity: Joi.number().positive().required(),
  images: Joi.array().items(
    Joi.object({
      publicId: Joi.string(),
      imageUrl: Joi.string(),
    })
  ),
  shipping: Joi.string().valid('Yes', 'No').required(),
  color: Joi.string().trim(true).max(32).required(),
  brand: Joi.string().trim(true).max(32).required(),
});

module.exports = {
  productValidationSchema,
};
