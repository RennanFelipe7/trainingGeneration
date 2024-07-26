const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function createAndSetToken(req, res, next) {
  
  const token = jwt.sign({}, process.env.SECRET_KEY_JWT, { expiresIn: '30m' });

  req.session.token = token;

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/'
  });

  next();
}
