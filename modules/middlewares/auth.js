const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const settings = require('../../settings');

module.exports = function(req, res, next) {

  console.log(req.data.access_token)
  jwt.verify(req.data.access_token, settings.publicKey, (err, decoded) => {
    if(err) {
      res.status(401).json(err);
      return;
    }

    let user = decoded.user;
    user._id = ObjectID(decoded.user._id);
    req.user = user;

    next();
  });
}
