var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var alertSchema = new Schema({
    title: { type: String },
    day: { type: String },
    hour:   { type: String },
    direction:   { type: String },
    description:   { type: String },
    subway:   { type: String },
    city:   { type: String },
    district:   { type: String }
})
module.exports = mongoose.model('alertModel', alertSchema);
