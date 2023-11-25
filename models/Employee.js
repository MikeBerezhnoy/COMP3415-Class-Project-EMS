const User = require('../models/User');
var mongoose = require('mongoose');

const Employee = User.discriminator('Employee', new mongoose.Schema({
    hourlyRate: { type: Number },
    department: {type: String},
    shiftList: { type: Array } 
}));

module.exports = Employee;
