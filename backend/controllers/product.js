const status = require('http-status');
const cloudinary = require('cloudinary');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const Product = require('../models/product');
const catchAsync = require('../middlewares/catch-async');
const AppError = require('../utils/app-error');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getProducts = catchAsync(async (req, res) => {
  const {
    sortColumn = 'createdAt',
    order = 'desc',
    page,
    perPage,
    ...rest
  } = req.query;

  const pageNumber = parseInt(page || 1, 10);
  const perPageNumber = parseInt(perPage || 12, 10);

  const products = await Product.find()
    .skip((pageNumber - 1) * perPageNumber)
    .limit(perPageNumber)
    .populate('category')
    .populate('subcategories')
    .sort([[sortColumn, order]]);

  res.status(status.OK).json({ success: true, products });
});

exports.createProduct = catchAsync(async (req, res) => {
  const { images, ...rest } = req.body;
  rest.slug = slugify(rest.title);

  const uploadedImagesInfo = await Promise.all(
    images.map((image) =>
      cloudinary.uploader.upload(image, {
        public_id: uuidv4(),
        resource_type: 'auto', // jpeg, png
      })
    )
  );

  rest.images = uploadedImagesInfo.map((image) => ({
    publicId: image.public_id,
    url: image.secure_url,
  }));

  const product = await Product.create(rest);

  res.status(status.CREATED).json({ success: true, product });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', status.NOT_FOUND));
  }

  product.images.forEach(async (image) => {
    await cloudinary.uploader.destroy(image.publicId);
  });

  res.status(status.NO_CONTENT).json();
});
