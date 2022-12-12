const status = require('http-status');
const slugify = require('slugify');
const Category = require('./category.model');
const Product = require('../product/product.model');
const catchAsync = require('../../middlewares/catch-async');
const AppError = require('../../utils/app-error');

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.status(status.OK).json({ success: true, categories });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('Category not found', status.NOT_FOUND));
  }

  res.status(status.OK).json({ success: true, category });
});

exports.createCategory = catchAsync(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });

  res.status(status.CREATED).json({ success: true, category });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, slug: slugify(name) },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    return next(new AppError('Category not found', status.NOT_FOUND));
  }

  res.status(status.OK).json({ success: true, category });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('Category not found', status.NOT_FOUND));
  }

  res.status(status.NO_CONTENT).json();
});

exports.getCategoryProducts = catchAsync(async (req, res, next) => {
  const { sortColumn = 'createdAt', order = 'desc', page, perPage } = req.query;

  const pageNumber = parseInt(page || 1, 10);
  const perPageNumber = parseInt(perPage || 12, 10);

  const products = await Product.find({ category: req.params.id })
    .skip((pageNumber - 1) * perPageNumber)
    .limit(perPageNumber)
    .populate('category')
    .populate('subcategories')
    .sort([[sortColumn, order]]);

  const totalCount = await Product.countDocuments({
    category: req.params.id,
  });

  res.status(status.OK).json({ success: true, products, totalCount });
});
