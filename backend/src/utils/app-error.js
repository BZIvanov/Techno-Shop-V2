class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // this method will provide us the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
