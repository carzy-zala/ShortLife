class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong !",
    errors = [],
    stack = ""
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    if (stack) {
      this.stack = stack;
    }
    {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
