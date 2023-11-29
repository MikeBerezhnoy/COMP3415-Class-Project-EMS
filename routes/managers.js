var express = require('express');
var router = express.Router();

//import user model
const User = require('../models/User')
const Employee = require('../models/Employee');


router.get('/', (req, res, next) => {
    res.render('managers/index', { title: 'Managers page' });
});

router.get('/add', (req, res, next) => {
    res.render('managers/add', { title: 'Add Employee' });
});

router.post('/add', (req, res, next) => {
    const userName = req.body.firstName 
    User.register( 
        new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.firstName + "" + req.body.lastName,
        birthDate: req.body.birthDate,
        role: req.body.role,
        address: req.body.address,
        hireDate: req.body.hireDate,
        hourlyRate: req.body.hourlyRate
        }),
        req.body.password,
        (err) => {
            if(err){
                console.log(err)
                res.redirect('/managers/add')
            }
            else{
                res.redirect('/managers/list')
            }
        }
    )   
    })

router.get('/list', (req, res, next) => {
    Employee.find({}).then((employees) => {
        res.render('managers/list', { title: 'Employee List', employees: employees });
    });
});

router.get('/edit/:id', (req, res, next) => {
    Employee.findOne({ _id: req.params.id }).then((employee) => {
        res.render('managers/edit', { title: 'Edit Employee', employee: employee });
    }); 
});

router.post('/edit/:id', (req, res, next) => {
    Employee.updateOne({ _id: req.params.id }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.firstName + "" + req.body.lastName,
        password: req.body.birthDate,
        birthDate: req.body.birthDate,
        role: req.body.role,
        address: req.body.address,
        hireDate: req.body.hireDate,
        hourlyRate: req.body.hourlyRate
    }).then(() => {
        res.redirect('/managers/list');
    });
});

router.get('/delete/:_id', (req,res,next)=>{
    Employee.deleteOne({
        _id: req.params._id
    }).then(() => {
        res.redirect('/manager/list');
    })
});

module.exports = router;
