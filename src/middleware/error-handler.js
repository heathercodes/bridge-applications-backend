const logger = require('../utils/logger').logger;

const errorHandler = (
  err,
  req,
  res,
  next
) => {
  logger.error(err.message);
  if (process.env.NODE_ENV !== 'production') {
    logger.error(err.stack)
  }
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({
    error: err.message
  });
};

module.exports = {
  errorHandler
}
