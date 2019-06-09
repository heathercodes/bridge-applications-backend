const { ForbiddenError, NotFoundError } = require('../utils/errors');

function decodeToken(token, next) {
  if (!token) {
    next(new NotFoundError('missing token'));
  }

  const decoded = Buffer.from(token, 'base64').toString('ascii');

  if (!decoded.length) {
    next(new ForbiddenError('invalid token'));
  }

  return decoded;
}

module.exports = decodeToken;
