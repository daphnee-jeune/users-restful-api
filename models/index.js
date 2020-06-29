let mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI ||
    'mongodb://localhost/users-api',
    { useNewUrlParser: true, useUnifiedTopology: true } 
)

let User = require('./user')

module.exports.User = User