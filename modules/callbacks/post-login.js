const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require("path");


function findUser(req,res,next)
{
  let query = { username: req.body.username }
  let collection = req.app.get('DB').collection('User');

  let p = collection.findOne(query);
  p.then(result => {
    if(result) {
      req.user = {
        id: result._id,
        username: result.username,
        password: result.password,
        role: result.role

      }
      next();
    } else res.status(401).send('user_not_found');
  }).catch(err => {
    res.status(500).json(err);
  });

}

function passControl(req,res,next){
  let p = bcrypt.compare(req.body.password, req.user.password);
  p.then(result => {
    if(result){
      next();
    } else res.status(401).send('wrong_password');
  }).catch(err => {
    res.status(500).json(err);
  });
}

function createToken(req,res,next){

  let privateKey = fs.readFileSync(path.resolve(__dirname, "../../keys/private.key"))
  let token = jwt.sign({ _id:req.user.id, username: req.user.username,role: req.user.role}, privateKey, { algorithm: 'RS256'})
    res.end();
}


module.exports = [findUser, passControl,createToken]
