const jwt = require('jsonwebtoken');
const Admin =  require('../models/admin');
const config = require('../../config');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;
    // check if a user exists
    return Admin.findById(userId).then(user => {
      console.log(user);
      if (!user) {
          console.log('cannot find user');
        return res.status(401).end();
      }

      return next();
    });
  });
};
