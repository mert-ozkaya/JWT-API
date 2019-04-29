const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const settings = require('../../settings');

module.exports = function(req, res, next) {

  const access_token = req.cookies.access_token || req.get('Authorization') || null || req.headers['x-access-token'] || req.body.token || req.query.token;

  let options = {
    algorithm: 'RS256',
  };

  if(access_token)
  {
    jwt.verify(access_token, settings.publicKey,options, (err, decoded) => {
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
  else{
      res.json({
        status : false,
        message: 'No token provided'
      })
  }


}
