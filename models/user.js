// set up mongoose
let mongoose = require('mongoose'),
    Schema = mongoose.Schema

let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    age: Number,
    review: String
})

let User = mongoose.model('User', UserSchema)
module.exports = User