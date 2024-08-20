const CustomError = require("../utils/customError");

// Error-handling middleware
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const formattedError = err.formatError();
    return res.status(err.statusCode).json(formattedError);
  }
  return res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred',
  });
};

module.exports = errorHandler;
