var express = require('express');
var router = express.Router();

//import user model
const User = require('../models/User')
const Employee = require('../models/Employee');
const Shift = require('../models/Shift');

//// This block needs to be in every route file that needs to check if the user is logged in
//middleware to check if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function isLoggedInManager(req, res, next){
    if(req.user.type == 'Manager' || req.user.type == 'Admin'){
        return next();
    }
    res.redirect('/login');
}
////

router.get('/', isLoggedIn, isLoggedInManager, (req, res, next) => {
    res.render('managers/index', { title: 'Managers page', user: req.user });
});

//going to form page to add a employee
router.get('/add', isLoggedIn, isLoggedInManager, (req, res, next) => {
    res.render('managers/add', { title: 'Add Employee', user: req.user });
});

//Adding the employee into the database and creating there account with hashed password
router.post('/add', isLoggedIn, isLoggedInManager, (req, res, next) => {
    const userName = req.body.firstName 
    User.register( 
        new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.firstName + "" + req.body.lastName,
        birthDate: req.body.birthDate + " " + "5:00:00",
        role: req.body.role,
        address: req.body.address,
        hireDate: req.body.hireDate + " " + "5:00:00",
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

//getting a list of employees
router.get('/list', isLoggedIn, isLoggedInManager, (req, res, next) => {
    Employee.find({}).then((employees) => {
        res.render('managers/list', { title: 'Employee List', employees: employees, user: req.user });
    });
});

//goes to the specified employee to edit
router.get('/edit/:id', isLoggedIn, isLoggedInManager, (req, res, next) => {
    Employee.findOne({ _id: req.params.id }).then((employee) => {
        res.render('managers/edit', { title: 'Edit Employee', employee: employee, user: req.user });
    }); 
});

//updates the db with the edits to the specified employee
router.post('/edit/:id', isLoggedIn, isLoggedInManager, (req, res, next) => {
    Employee.updateOne({ _id: req.params.id }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.firstName + "" + req.body.lastName,
        password: req.body.birthDate,
        birthDate: req.body.birthDate + " " + "5:00:00",
        role: req.body.role,
        address: req.body.address,
        hireDate: req.body.hireDate + " " + "5:00:00",
        hourlyRate: req.body.hourlyRate
    }).then(() => {
        res.redirect('/managers/list');
    });
});

//gets the specified employee and deletes them from the db
router.get('/delete/:_id', isLoggedIn, isLoggedInManager, (req,res,next)=>{
    Employee.deleteOne({
        _id: req.params._id
    }).then(() => {
        res.redirect('/managers/list');
    })
});

router.get('/reports', isLoggedIn, isLoggedInManager, (req, res, next) => {
    Employee.find({}).then((employees) => {
        Shift.find({}).then((shifts) => {
            res.render('managers/reports', { title: 'Reports', employees: employees, shifts: shifts, user: req.user });
        });
    });
});

router.post('/reports', isLoggedIn, isLoggedInManager, (req, res, next) => {
    Employee.findOne({ username: req.body.selectedEmployee}).then((employee) => {
        Shift.find({}).then((shifts) => {
            res.render('managers/generatedReport', { title: 'Reports', employee: employee, shifts: shifts, user: req.user });
        });
    });
});

module.exports = router;
