let mongoose = require('mongoose');

// course schema
let courseSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  description: {
    type: String
  }
});

let Course = module.exports = mongoose.model('Course', courseSchema);