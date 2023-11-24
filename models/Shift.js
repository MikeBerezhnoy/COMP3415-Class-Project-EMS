var mongoose = require('mongoose');

var ShiftSchema = new mongoose.Schema(
    {
        jobCode: { type: String, required: true },
        date: { type: Date, required: true },
        startTime: { type: Date, required: true },  // (date included in start time)
        endTime: { type: Date, required: true },
        //assignedWorker: { type: Employee },
        assignedWorker: { type: String }, //needs to be replaced with above when possible
        status: { type: String },
        punchInTime: { type: Date },
        punchOutTime: { type: Date }
        //, state: { type: String }
    }
);

const Shift = mongoose.model("Shift", ShiftSchema);
module.exports = Shift