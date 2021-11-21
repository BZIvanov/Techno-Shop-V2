const status = require('http-status');
const slugify = require('slugify');
const Product = require('../models/product');
const catchAsync = require('../middlewares/catch-async');
// const AppError = require('../utils/app-error');

exports.createProduct = catchAsync(async (req, res) => {
  const productData = { ...req.body };
  productData.slug = slugify(productData.title);

  const product = await Product.create(productData);

  res.status(status.CREATED).json({ success: true, product });
});
