var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    description:   { type: String },
    icon:   { type: String },
    mail:   { type: String },
    admin: { type: Boolean }
})
module.exports = mongoose.model('userModel', userSchema);
