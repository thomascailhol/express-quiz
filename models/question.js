var mongoose = require('mongoose')
// let chapterSchema = require('../models/chapter')

let Answers = mongoose.Schema({
  text: {
    type: String,
    // required: true
  }
});

// course schema
let Question = mongoose.Schema({
  text: {
    type: String,
    // unique: true,
    // index: true,
    // required: true
  },
  description: {
    type: String
  },
  answers: [Answers]
});

module.exports = mongoose.model('Question', Question);
