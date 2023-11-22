var express = require('express');
var router = express.Router();

//import user model
const User = require('../models/User');

router.get('/', (req, res, next) => {
    res.render('managers/index', { title: 'Managers page' });
});

router.get('/add', (req, res, next) => {
    res.render('managers/add', { title: 'Add Employee' });
});

router.post('/add', (req, res, next) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.firstName + "" + req.body.lastName,
        password: req.body.birthDate,
        role: req.body.role,
        address: req.body.address,
        hireDate: req.body.hireDate
    })
res.redirect('/managers');
});

router.get('/list', (req, res, next) => {
    User.find({}).then((users) => {
        res.render('managers/list', { title: 'Employee List', users: users });
    });
});

router.get('/edit/:id', (req, res, next) => {
    User.findOne({ _id: req.params.id }).then((user) => {
        res.render('managers/edit', { title: 'Edit Employee', user: user });
    }); 
});

router.post('/edit/:id', (req, res, next) => {
    User.updateOne({ _id: req.params.id }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.firstName + "" + req.body.lastName,
        password: req.body.birthDate,
        birthDate: req.body.birthDate,
        role: req.body.role,
        address: req.body.address,
        hireDate: req.body.hireDate
    }).then(() => {
        res.redirect('/managers/list');
    });
});

module.exports = router;
