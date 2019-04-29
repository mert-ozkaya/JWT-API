const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt');
var parseurl = require('parseurl')

var fs = require('fs');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function(req, res, next) {
  req.data = {};
  next();
});

app.use('/',require('./modules/router'))




module.exports = app;
