const jwt = require('jsonwebtoken');
const fs = require('fs');
var path = require('path');
const settings = require('../../settings');
/**
 * Reads from req.data.user
 * Writes to req.data.access_token
 */
module.exports = function(req, res, next) {
  console.log("genereate'e girdi");
  let payload = {
    user: {
      _id: req.data.user._id,
      username: req.data.user.username,
      role: req.data.user.role
    }
  };

  let options = {
    algorithm: 'RS256',
  };


  req.data.access_token = jwt.sign(payload, settings.privateKey, options);

  next();
}
