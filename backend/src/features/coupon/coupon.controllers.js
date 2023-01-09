const status = require('http-status');
const Coupon = require('./coupon.model');
const catchAsync = require('../../middlewares/catch-async');

module.exports.getCoupons = catchAsync(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 }).exec();

  res.status(status.OK).json({ success: true, coupons });
});

module.exports.createCoupon = catchAsync(async (req, res) => {
  const coupon = await new Coupon(req.body).save();

  res.status(status.CREATED).json({ success: true, coupon });
});
