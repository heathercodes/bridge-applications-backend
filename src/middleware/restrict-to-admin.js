const User = require('../routes/users/users.model');
const decodeToken = require('./decode');
const { ForbiddenError } = require('../utils/errors');

async function restrictToAdmin(req, res, next) {
  const [, token] = req.headers.authorization.split(' ');
  const decodedToken = decodeToken(token, next);

  try {
    const checkAdmin = await User.query()
      .findById(decodedToken)
      .select('role');

    if (checkAdmin.role === 'admin') {
      next();
    }
  } catch (err) {
    next(new ForbiddenError("you don't have permission to view this resource"));
  }
}

module.exports = restrictToAdmin;
