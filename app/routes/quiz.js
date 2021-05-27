const router = require("express").Router();
let quizSchema = require("../models/Quiz");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtTokenWord = process.env.JWT_TOKEN_WORD;

router.get("/:token", (req, res) => {
  let decoded = jwt.verify(req.params.token, `${jwtTokenWord}`);
  let canViewAnswer = false;
  let canEdit = false;
  if (decoded.user.premissionLevel == "Edit") {
    canViewAnswer = true;
    canEdit = true;
  } else if (decoded.user.premissionLevel == "View") {
    canViewAnswer = true;
  }

  quizSchema
    .find({}).populate('questions.question')
    .then((quiz) => res.json({ quiz, canViewAnswer, canEdit }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const name = req.body.name;


  const newQuiz = new quizSchema({
    name,
  });

  newQuiz
    .save()
    .then(() => res.json("Quiz added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
    quizSchema
    .findById(req.params.id)
    .then((quiz) => res.json(quiz))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/delete/:id", (req, res) => {
    quizSchema
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Question deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", (req, res) => {
    quizSchema
    .findById(req.params.id)
    .then((quiz) => {
      quiz.quiz = req.body.quiz;


      quiz
        .save()
        .then(() => res.json("Quiz updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
