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
    
      type: mongoose.Schema.Types.ObjectId, 
      require: true,
      ref:"quiz"
    
}],

  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model("questions", QuestionsSchema);