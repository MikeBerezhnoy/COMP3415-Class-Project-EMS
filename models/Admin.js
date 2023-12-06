const User = require('../models/User');
var mongoose = require('mongoose');

const Admin = User.discriminator('Admin', new mongoose.Schema({
    salaryRate: { type: Number },
    adminRole: {type: String}
}));


module.exports = Admin;