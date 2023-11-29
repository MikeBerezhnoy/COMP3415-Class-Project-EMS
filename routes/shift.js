var express = require('express');
var router = express.Router();

//import user model
const Shift = require('../models/Shift');
const Employee = require('../models/Employee');

router.get('/', (req, res, next) => {
    Shift.find({}).then((shifts) => {
        res.render('managers/shift/index', { title: 'List of shifts', shifts: shifts });
    });
});

router.get('/add', (req, res, next) => {
    Employee.find({}).then((employees) => {
        res.render('managers/shift/add', { title: 'Create Shift', employees: employees });});
});

//adds creates and shift object and adds it to the database
router.post('/add', (req, res, next) => {
    Shift.create({
        jobCode: req.body.jobCode,
        date: req.body.date,
        startTime: req.body.date+"T"+req.body.startTime,
        assignedWorker: req.body.assignedWorker,
        endTime: req.body.date+"T"+req.body.endTime
    })
res.redirect('/shift');
});

//goes to the specified shift to edit
router.get('/edit/:id', (req, res, next) => {
    Shift.findOne({ _id: req.params.id }).then((shift) => {
        res.render('managers/shift/edit', { title: 'Edit shift', shift: shift });
    }); 
});

//updates the specified shift 
router.post('/edit/:id', (req, res, next) => {
    Shift.updateOne({ _id: req.params.id }, {
        jobCode: req.body.jobCode,
        date: req.body.date,
        startTime: req.body.date+"T"+req.body.startTime,
        endTime: req.body.date+"T"+req.body.endTime
    }).then(() => {
        res.redirect('/shift');
    });
});

//deletes the specified shift
router.get('/delete/:_id', (req,res,next)=>{
    Shift.deleteOne({
        _id: req.params._id
    }).then(() => {
        res.redirect('/shift');
    })
});

module.exports = router;