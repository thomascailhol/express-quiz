var mongoose = require('mongoose')

let Chapters = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

// course schema
let Course = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  description: {
    type: String
  },
  chapters: [Chapters]
});

module.exports = mongoose.model('Course', Course);
