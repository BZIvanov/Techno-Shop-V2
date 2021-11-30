const status = require('http-status');
const cloudinary = require('cloudinary');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const Product = require('../models/product');
const catchAsync = require('../middlewares/catch-async');
// const AppError = require('../utils/app-error');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
