var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var assemblySchema = new Schema({
    id: { type: String },
    name: { type: String },
    password: { type: String },
    mail:   { type: String },
    direction: { type: String },
    description:   { type: String },
    city:   { type: String },
    district: { type: String }
})
module.exports = mongoose.model('assemblyModel', assemblySchema);
