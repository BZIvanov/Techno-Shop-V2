const status = require('http-status');
const slugify = require('slugify');
const Subcategory = require('../models/category');
const catchAsync = require('../middlewares/catch-async');
const AppError = require('../utils/app-error');

exports.getSubcategories = catchAsync(async (req, res) => {
  const subcategories = await Subcategory.find().sort({ createdAt: -1 });

  res.status(status.OK).json({ success: true, subcategories });
});

exports.getSubcategory = catchAsync(async (req, res, next) => {
  const subcategory = await Subcategory.findById(req.params.id);

  if (!subcategory) {
    return next(new AppError('Subcategory not found', status.NOT_FOUND));
  }

  res.status(status.OK).json({ success: true, subcategory });
});

exports.createSubcategory = catchAsync(async (req, res) => {
  const { name, categoryId } = req.body;
  const subcategory = await Subcategory.create({
    name,
    categoryId,
    slug: slugify(name),
  });

  res.status(status.CREATED).json({ success: true, subcategory });
});

exports.updateSubcategory = catchAsync(async (req, res, next) => {
  const { name, categoryId } = req.body;

  const subcategory = await Subcategory.findByIdAndUpdate(
    req.params.id,
    { name, categoryId, slug: slugify(name) },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!subcategory) {
    return next(new AppError('Subcategory not found', status.NOT_FOUND));
  }

  res.status(status.OK).json({ success: true, subcategory });
});

exports.deleteSubcategory = catchAsync(async (req, res, next) => {
  const subcategory = await Subcategory.findByIdAndDelete(req.params.id);

  if (!subcategory) {
    return next(new AppError('Subcategory not found', status.NOT_FOUND));
  }

  res.status(status.NO_CONTENT).json();
});
