const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// const UnauthorizedError = require('../utils/errors');

// jwt is express middleware for verifying JWT token
const authenticateRequest = jwt({
  // Dynamically provide a signing key based on the kid
  // in the header and the singing keys provided by the JWKS endpoint.
  // get the public key to check this token against
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-k0a577la.auth0.com/.well-known/jwks.json',
  }),

  // Validate the audience and the issuer.
  audience: 'https://applications-api',
  issuer: 'https://dev-k0a577la.auth0.com/',
  algorithms: ['RS256'],

  // get the sub from the JWT to use for authorization
});

// const mockAuthenticate = (req, res, next) => {
//   try {
//     header = req.headers.authorization;
//     if (!header) {
//       console.log("no token");
//       return next(new UnauthorizedError("Missing Token"));
//     }

//     const [, token] = req.headers.authorization;

//     req.user = {
//       id: 1
//     };

//     return next();
//   } catch (error) {
//     next(new UnauthorizedError("Missing Token"));
//   }
// };

module.exports = {
  authenticateRequest,
  // mockAuthenticate
};
