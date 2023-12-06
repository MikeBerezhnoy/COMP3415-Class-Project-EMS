var express = require('express');
var router = express.Router();

//// This block needs to be in every route file that needs to check if the user is logged in
//middleware to check if user is logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/login');
}

function isLoggedInManager(req, res, next){
  if(req.user.type = 'manager'){
      return next();
  }
  res.redirect('/login');
}
////

/* GET users listing. */
router.get('/',  isLoggedIn, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
