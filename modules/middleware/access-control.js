var jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {

console.log(req.session.user)
/*
var privateKey ="asasdas541dsa54d5sa4d"
var token = jwt.sign(req.body.username,)


*/

  next()
}
