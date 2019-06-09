const { logger } = require('../utils/logger');

const errorHandler = (
  err,
  req,
  res,
) => {
  logger.error(err.message);
  if (process.env.NODE_ENV !== 'production') {
    logger.error(err.stack);
  }
  if (!err.statusCode) err.statusCode = 500; // eslint-disable-line
  res.status(err.statusCode).json({
    error: err.message,
  });
};

module.exports = {
  errorHandler,
};
