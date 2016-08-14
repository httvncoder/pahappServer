var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var evictionSchema = new Schema({
    id: { type: String },
    title: { type: String },
    date: { type: String },
    hour:   { type: String },
    direction:   { type: String },
    description:   { type: String },
    access:   { type: String },
    city:   { type: String },
    district:   { type: String },
    assembly: { type: String }
})
module.exports = mongoose.model('evictionModel', evictionSchema);
