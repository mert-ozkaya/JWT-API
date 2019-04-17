const Router = require('express').Router;

const router = Router();

//router.get('/signup',require('./callbacks/get-signup'));
router.get('/login',require('./callbacks/get-login'));

//router.post('/signup', require('./callbacks/post-signup'))
router.post('/login',require('./callbacks/post-login'))

module.exports = router;
