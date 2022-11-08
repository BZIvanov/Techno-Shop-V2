const status = require('http-status');
const AppError = require('../utils/app-error');

module.exports = (joiSchema) => (req, res, next) => {
  const { error } = joiSchema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, status.BAD_REQUEST));
  }

  next();
};
