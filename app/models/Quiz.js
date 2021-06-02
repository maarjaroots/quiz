const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
 
  name: {
    type: String,
    required: true,
    minlenght: 3,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "questions",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("quiz", QuizSchema);
