var express = require('express');
var router = express.Router();

//import user model
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

function isLoggedInManager(req, res, next){
    if(req.user.type = 'manager'){
        return next();
    }
    res.redirect('/login');
}
////

router.get('/', isLoggedIn, (req, res, next) => {
    Shift.find({}).then((shifts) => {
        res.render('managers/shift/index', { title: 'List of shifts', shifts: shifts, user: req.user });
    });
});

router.get('/add', isLoggedIn, (req, res, next) => {
    Employee.find({}).then((employees) => {
        res.render('managers/shift/add', { title: 'Create Shift', employees: employees, user: req.user });});
});

//adds creates and shift object and adds it to the database
router.post('/add', isLoggedIn, (req, res, next) => {
    Shift.create({
        jobCode: req.body.jobCode,
        date: req.body.date+ " " + "5:00:00",
        startTime:req.body.date + " " + req.body.startTime,
        assignedWorker: req.body.assignedWorker,
        endTime: req.body.date+"T"+req.body.endTime
    })
res.redirect('/shift', {user: req.user});
});

//goes to the specified shift to edit
router.get('/edit/:id', isLoggedIn, (req, res, next) => {
    Shift.findOne({ _id: req.params.id }).then((shift) => {
        res.render('managers/shift/edit', { title: 'Edit shift', shift: shift, user: req.user });
    }); 
});

//updates the specified shift 
router.post('/edit/:id', isLoggedIn, (req, res, next) => {
    Shift.updateOne({ _id: req.params.id }, {
        jobCode: req.body.jobCode,
        date: req.body.date+ " " + "5:00:00",
        startTime: req.body.date+"T"+req.body.startTime,
        endTime: req.body.date+"T"+req.body.endTime
    }).then(() => {
        res.redirect('/shift');
    });
});

//deletes the specified shift
router.get('/delete/:_id', isLoggedIn, (req,res,next)=>{
    Shift.deleteOne({
        _id: req.params._id
    }).then(() => {
        res.redirect('/shift');
    })
});

module.exports = router;