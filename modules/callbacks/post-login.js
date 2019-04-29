const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require("path");

////////****************************************************************////////

function findUser(req,res,next)
{
  let query = { username: req.body.username }
  let collection = req.app.get('DB').collection('User');

  let p = collection.findOne(query);
  p.then(result => {
    if(result) {
      req.data.user = result;
      next();
    } else res.status(401).send('user_not_found');
  }).catch(err => {
    res.status(500).json(err);
  });
}

////////****************************************************************////////

function passControl(req,res,next){
  console.log("passcontorl")
  let p = bcrypt.compare(req.body.password, req.data.user.password);
  p.then(result => {
    if(result){
        console.log("şifre doğru");
      next();
    } else res.status(401).send('yanlis sifre');
  }).catch(err => {
    res.status(500).json(err);
  });
}

////////****************************************************************////////

function sendResponse(req, res) {
  res.json({
    access_token: req.data.access_token
  });

    req.cookies.access_token =  req.data.access_token;
}

////////****************************************************************////////



module.exports = [
  findUser,
  passControl,
  require('../middlewares/generate-access-token'),
  sendResponse
];
