var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "First name is required"]},
    lastName: {type: String, required: [true, "Last name is required"]},
    username: {type: String, required},
    password: {type: String, required},
    role: {type: String, required},
    address: {type: String},
    hireDate: {type: Date}
    //,baseOptions
})

// https://techinsights.manisuec.com/mongodb/mongoose-discriminator-non-dry-way-inherit-properties/#:~:text=Mongoose%20Discriminator%20is%20another%20very,the%20same%20underlying%20MongoDB%20collection.
// const BaseUser = mongoose.model('User', UserSchema)
// const Employee = BaseUser.discriminator('Employee', new mongoose.Schema({ 
// 	hourlyRate : { type: double },
// 	shiftList  : { type: List } //should be array
// 	})
// );
