var mongoose = require('mongoose');
const Employee = require('../models/User');

var ReportSchema = new mongoose.Schema(
    {
        reportDate: { type: Date},
        selectedEmployee: { type: String},
        type: { type: String},
        autoGen: { type: Boolean}
    }
);

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report