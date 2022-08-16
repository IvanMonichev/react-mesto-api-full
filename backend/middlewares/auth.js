const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorized-error');

const checkAuthorization = (req, res, next) => {

  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = {
  checkAuthorization,
};
