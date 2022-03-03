const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../../config');

const generateJWT = (payload) =>
  jwt.sign(payload, config.jwt.private, {
    expiresIn: config.jwt.expiresIn,
    algorithm: 'RS256',
  });

const verifyJWT = (token) => jwt.verify(token, config.jwt.public, { algorithm: 'RS256' });

const authorize = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (user, error, info) => {
    if (error) {
      return res.status(401).send(error);
    }
    if (!user) {
      return res.status(401).send(info);
    }
    req.user = user;
    req.userType = info;
    return next();
  })(req, res);
};

module.exports = {
  generateJWT,
  verifyJWT,
  authorize,
};
