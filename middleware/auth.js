const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); // 401 means not authorized
  }

  // Verify token
  try {
    //              jwt.verify(token, secretOrPublicKey, [options, callback])
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  }
  catch (err) {
    res.status(401).json({ msg: 'token is not valid' })
  }
};