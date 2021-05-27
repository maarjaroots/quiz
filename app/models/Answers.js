const mongoose = require("mongoose");

const AnswersSchema = mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model("answers", AnswersSchema);