var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var assemblySchema = new Schema({
    name: { type: String },
    password: { type: String },
    mail:   { type: String },
    phone: { type: Number },
    direction: { type: String },
    description:   { type: String },
    city:   { type: String },
    district: { type: String },
    evictions: [{
      title: { type: String },
      date: { type: Date },
      direction: { type: String },
      description: { type: String },
      access: { type: String },
      city: { type: String },
      district: { type: String }
    }]
})
module.exports = mongoose.model('assemblyModel', assemblySchema);
