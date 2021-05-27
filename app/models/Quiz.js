const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 3,
  },
questions: [
    {
        question:{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref:"questions"
        }
   // type: mongoose.Schema.Types.ObjectId, ref:"questions"
}],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("quiz", QuizSchema);
