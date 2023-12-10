const calendar = require('../config/calender-config');
var express = require('express');
var router = express.Router();

// const Employee = require('../models/Employee');
const Shift = require('../models/Shift');
const Employee = require('../models/Employee');

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
    // Employee.findOne().then((employee))
    res.render('employee/index', { title: 'Employee Information', user: req.user });
});

router.get('/shifts', isLoggedIn, (req, res, next) => {
    const year = req.query.year || 2020;
    const months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
    Shift.find({}).then((shifts) => {
        res.render('employee/shifts', { title: 'List of shifts', shifts: shifts, user: req.user, calendar: calendar(year), months, year });
    });
});

router.get('/punch', isLoggedIn, (req, res, next) =>{
    Shift.find({}).then((shifts) => {
        res.render('employee/punch', { title: 'Punch In or Out', shifts: shifts, user: req.user });
    });
})

router.get('/punch/validateIn/:id', isLoggedIn, (req, res, next) =>{
    Shift.updateOne({_id: req.params.id},{
        punchInTime: Date.now()})
    .then(() => {
        res.render('employee/punch/validateIn', { title: 'Punch In', user: req.user });
    });
})


router.get('/punch/validateOut/:id', isLoggedIn, (req, res, next) =>{
    Shift.updateOne({_id: req.params.id},{
        punchOutTime: Date.now()})
    .then(() => {
        res.render('employee/punch/validateOut', { title: 'Punch Out', user: req.user });
    });
})



module.exports = router;