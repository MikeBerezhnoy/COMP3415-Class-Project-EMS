var express = require('express');
var router = express.Router();

// const Employee = require('../models/Employee');
const Shift = require('../models/Shift');

router.get('/', (req, res, next) => {
    res.render('employee/index', { title: 'Employee page' });
});

router.get('/shifts', (req, res, next) => {
    Shift.find({}).then((shifts) => {
        res.render('employee/shifts', { title: 'List of shifts', shifts: shifts, user: req.user });
    });
});

module.exports = router;