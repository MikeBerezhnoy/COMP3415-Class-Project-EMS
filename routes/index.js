var express = require('express');
var router = express.Router();

const User = require('../models/User')
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login', user: req.user });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Login2' });
});

// GET /Login
router.get('/login', (req,res,next) =>{
  let messages = req.session.messages || []
  req.session.messages = []
  //pass to view
  res.render('login', {title: 'Login', messages: messages} );
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'Invalid Credentials'
}));

//GET /logout
router.get('/logout',(req,res,next)=>{
  req.logout(function(err){
    res.redirect('/login');// user gets logged out, session is cleared, and user is redirected to login
  });
});

module.exports = router;
