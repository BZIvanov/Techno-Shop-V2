const crypto = require('crypto');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const User = require('./user.model');
const sendEmail = require('../../providers/mailer');
const AppError = require('../../utils/app-error');
const catchAsync = require('../../middlewares/catch-async');

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res
    .header('Authorization', `Bearer ${token}`)
    .status(statusCode)
    .json({
      success: true,
      token,
      user: { _id: user._id, username: user.username, role: user.role },
    });
};

exports.register = catchAsync(async (req, res) => {
  const { username, email, password, address } = req.body;

  const user = await User.create({ username, email, password, address });

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

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', status.UNAUTHORIZED));
  }

  sendTokenResponse(user, status.OK, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const token = jwt.sign({ id: '' }, process.env.JWT_SECRET, {
    expiresIn: 1, // 1second
  });

  res
    .header('Authorization', `Bearer ${token}`)
    .status(status.OK)
    .json({ success: true, token, user: null });
});

exports.currentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(status.OK).json({
    success: true,
    user: { _id: user._id, username: user.username, role: user.role },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(
      new AppError(
        'Both current and new passwords are required',
        status.BAD_REQUEST
      )
    );
  }

  if (!(await user.comparePassword(oldPassword))) {
    return next(new AppError('Incorrect password', status.UNAUTHORIZED));
  }

  user.password = newPassword;
  await user.save();
  res.status(status.OK).json({ success: true });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(status.OK).json({
      success: true,
      message:
        'You will soon receive an email, if the provided email was valid.',
    });
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  const text = `Here is your password reset URL:\n\n${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      text,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError('Email was not sent!', status.INTERNAL_SERVER_ERROR)
    );
  }

  res.status(status.OK).json({
    success: true,
    message: 'You will soon receive an email, if the provided email was valid.',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token, newPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Invalid token', status.BAD_REQUEST));
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, status.OK, res);
});
