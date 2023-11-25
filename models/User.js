var mongoose = require('mongoose');

const baseOptions = {
    discriminatorKey: "type",
    collection: "users",
};

var UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: [true, "First name is required"] },
        lastName: { type: String, required: [true, "Last name is required"] },
        username: { type: String, required: [true]},
        password: { type: String, required: [true] },
        role: { type: String, required: [true] },
        address: { type: String },
        birthDate: { type: Date },
        hireDate: { type: Date },
    },
    baseOptions
);

UserSchema.methods.setUserName = function () {
    this.username = this.firstName + this.lastName;
    return this.username;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;