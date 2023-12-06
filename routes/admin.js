var express = require('express');
var router = express.Router();

//import user model
const User = require('../models/User')
const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
const Manager = require('../models/Managers');

//// This block needs to be in every route file that needs to check if the user is logged in
//middleware to check if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function isLoggedInAdmin(req, res, next){
    if(req.user.type = 'admin'){
        return next();
    }
    res.redirect('/login');
}

// router.get('/', isLoggedIn, isLoggedInAdmin, (req, res, next) => {
//     res.render('admin/index', { title: 'Admin page', user: req.user });
// });

router.get('/', isLoggedIn, isLoggedInAdmin, (req, res, next) => {
    res.render('admin/index', { title: 'Admin page', user: req.user });
});

router.get('/createAdmin', isLoggedIn, isLoggedInAdmin, (req, res, next) => {
    res.render('admin/createAdmin', { title: 'Create Admin', user: req.user });
});

//Adding the employee into the database and creating there account with hashed password
router.post('/createAdmin', isLoggedIn, isLoggedInAdmin, (req, res, next) => {
    const userName = req.body.firstName 
    User.register( 
        new Admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.firstName + "" + req.body.lastName,
        birthDate: req.body.birthDate,
        role: req.body.role,
        address: req.body.address,
        hireDate: req.body.hireDate,
        salaryRate: req.body.salaryRate,
        adminRole: req.body.adminRole
        }),
        req.body.password,
        (err) => {
            if(err){
                console.log(err)
                res.redirect('/admin/createAdmin')
            }
            else{
                res.redirect('/admin')
            }
        }
    )   
})

router.get('/add', isLoggedIn, isLoggedInAdmin, (req, res, next) => {
    res.render('admin/add', { title: 'Add Manager', user: req.user });
});

router.post('/add', isLoggedIn, isLoggedInAdmin, (req, res, next) => {
    const userName = req.body.firstName 
    User.register( 
        new Manager({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.firstName + "" + req.body.lastName,
        birthDate: req.body.birthDate,
        role: req.body.role,
        address: req.body.address,
        hireDate: req.body.hireDate,
        department: req.body.department
        }),
        req.body.password,
        (err) => {
            if(err){
                console.log(err)
                res.redirect('/admin/add')
            }
            else{
                res.redirect('/admin')
            }
        }
    )   
})

module.exports = router;