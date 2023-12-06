const User = require('../models/User')
var mongoose = require('mongoose');

const Manager = User.discriminator('Manager', new mongoose.Schema({
    department: {type: String},
    reportingEmployees: {type: Array}
}));

module.exports = Manager;