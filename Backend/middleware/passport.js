/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const userSecret = require('../constants/appConstant').JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, userSecret, (err, user) => {
      if (err) {
        return res.unAuthorizedRequest(err);
      }
      req.user = user;
      next();
    });
  } else {
    return res.unAuthorizedRequest({});
  }
};
