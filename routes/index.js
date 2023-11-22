var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

/* POST home page. */
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Login2' });
});

// GET /Login
router.get('/login', (req,res,next) =>{
  //pass to view
  res.render('login', {title: 'Login'});
});

module.exports = router;
