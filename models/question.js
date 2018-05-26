var mongoose = require('mongoose')

let Answers = mongoose.Schema({
  text: {
    type: String,
  }
});

let Question = mongoose.Schema({
  text: {
    type: String
  },
  description: {
    type: String
  },
  answers: [Answers]
});

module.exports = mongoose.model('Question', Question);
