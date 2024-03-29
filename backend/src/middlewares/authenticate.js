const status = require('http-status');
const jwt = require('jsonwebtoken');
const catchAsync = require('./catch-async');
const AppError = require('../utils/app-error');
const User = require('../features/user/user.model');

module.exports = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return next(new AppError('You are not logged in', status.UNAUTHORIZED));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('User not found', status.UNAUTHORIZED));
  }

  req.user = currentUser;
  next();
});
