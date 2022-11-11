const status = require('http-status');
const cloudinary = require('cloudinary');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const Product = require('./product.model');
const catchAsync = require('../../middlewares/catch-async');
const AppError = require('../../utils/app-error');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handleQueryParams = async (params) => {
  const { text, price } = params;

  const build = {
    ...(text && { $text: { $search: text } }),
    ...(price && {
      price: {
        $gte: parseInt(price.split(',')[0], 10),
        $lte: parseInt(price.split(',')[1], 10),
      },
    }),
  };

  return build;
};

exports.getProducts = catchAsync(async (req, res) => {
  const {
    sortColumn = 'createdAt',
    order = 'desc',
    page,
    perPage,
    ...rest
  } = req.query;

  const builder = await handleQueryParams(rest);

  const pageNumber = parseInt(page || 1, 10);
  const perPageNumber = parseInt(perPage || 12, 10);

  const products = await Product.find(builder)
    .skip((pageNumber - 1) * perPageNumber)
    .limit(perPageNumber)
    .populate('category')
    .populate('subcategories')
    .sort([[sortColumn, order]]);

  const totalCount = await Product.find().estimatedDocumentCount();

  res.status(status.OK).json({ success: true, products, totalCount });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate('category')
    .populate('subcategories');

  if (!product) {
    return next(new AppError('Product not found', status.NOT_FOUND));
  }

  res.status(status.OK).json({ success: true, product });
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

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('Product not found', status.NOT_FOUND));
  }

  res.status(status.OK).json({ success: true, product });
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

exports.rateProduct = async (req, res) => {
  const { rating: userRating } = req.body;

  const product = await Product.findById(req.params.id);

  const existingRatingObject = product.ratings.find(
    (rating) => rating.postedBy.toString() === req.user._id.toString()
  );

  if (existingRatingObject) {
    await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { 'ratings.$.star': userRating } },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: userRating, postedBy: req.user._id } },
      },
      { new: true }
    );
  }

  const updatedProduct = await Product.findById(req.params.id)
    .populate('category')
    .populate('subcategories');

  res.status(status.OK).json({ success: true, product: updatedProduct });
};

exports.getSimilarProducts = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', status.NOT_FOUND));
  }

  const PRODUCTS_COUNT = 3;

  const similarProducts = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(PRODUCTS_COUNT)
    .populate('category')
    .populate('subcategories');

  res.status(status.OK).json({
    success: true,
    products: similarProducts,
    totalCount: similarProducts.length,
  });
};