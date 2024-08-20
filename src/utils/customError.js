class CustomError extends Error {
  constructor(message, statusCode, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.errorCode = errorCode; // Optional field for specific error codes

    // Indicate that this is an operational error
    this.isOperational = true;

    // Capture stack trace (useful for debugging)
    Error.captureStackTrace(this, this.constructor);
  }

  // Method to format the error response for the client
  formatError() {
    return {
      status: this.status,
      message: this.message,
      errorCode: this.errorCode,
    };
  }
}

module.exports = CustomError;
