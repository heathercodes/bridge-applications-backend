class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 404;
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
}

class ForbiddenError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 403;
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
  ForbiddenError,
  NotFoundError
};