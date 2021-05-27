const mongoose = require("mongoose");

const QuestionsSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answers: [{
      answer: {
        type: mongoose.Schema.Types.ObjectId, 
        require: true,
        ref:"answers"
      }
  }],
  quizz: [{
    quiz: {
      type: mongoose.Schema.Types.ObjectId, 
      require: true,
      ref:"quiz"
    }
}],
//   correctAnswer: {
//     type: String,
//     required: true
//   },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model("questions", QuestionsSchema);