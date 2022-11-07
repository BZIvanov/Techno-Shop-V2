const status = require('http-status');
const cloudinary = require('cloudinary');
const { v4: uuidv4 } = require('uuid');
const catchAsync = require('../../middlewares/catch-async');
const AppError = require('../../utils/app-error');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImages = catchAsync(async (req, res) => {
  const image = await cloudinary.uploader.upload(req.body.image, {
    public_id: uuidv4(),
    resource_type: 'auto', // jpeg, png
  });

  res.status(status.OK).json({
    success: true,
    public_id: image.public_id,
    url: image.secure_url,
  });
});

exports.removeImage = catchAsync(async (req, res, next) => {
  const { result } = await cloudinary.uploader.destroy(req.body.public_id);

  if (result !== 'ok') {
    return next(new AppError('Remove image error', status.BAD_REQUEST));
  }

  res.status(status.NO_CONTENT).json();
});
