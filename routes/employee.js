var express = require('express');
var router = express.Router();

// const Employee = require('../models/Employee');
const Shift = require('../models/Shift');

//// This block needs to be in every route file that needs to check if the user is logged in
//middleware to check if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
//// 

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('employee/index', { title: 'Employee page', user: req.user });
});

router.get('/shifts', isLoggedIn, (req, res, next) => {
    Shift.find({}).then((shifts) => {
        res.render('employee/shifts', { title: 'List of shifts', shifts: shifts, user: req.user });
    });
});

module.exports = router;