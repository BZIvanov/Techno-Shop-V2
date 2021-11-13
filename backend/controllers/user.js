const status = require('http-status');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/app-error');
const catchAsync = require('../middlewares/catch-async');

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res
    .header('Authorization', `Bearer ${token}`)
    .status(statusCode)
    .json({ success: true });
};

exports.register = catchAsync(async (req, res) => {
  const { username, email, password, address, role } = req.body;

  const user = await User.create({ username, email, password, address, role });

  sendTokenResponse(user, status.CREATED, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError('Please provide email and password', status.BAD_REQUEST)
    );
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid credentials', status.UNAUTHORIZED));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', status.UNAUTHORIZED));
  }

  sendTokenResponse(user, status.OK, res);
});
