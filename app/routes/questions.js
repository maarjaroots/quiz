const router = require("express").Router();
let questionSchema= require("../models/Questions");
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

  questionSchema
    .find({}).populate('answers.answer')
    .then((question) => res.json({ question, canViewAnswer, canEdit }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const question = req.body.question;


  const newQuestion = new questionSchema({
    question
  });

  newQuestion
    .save()
    .then(() => res.json("Question added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
    questionSchema
    .findById(req.params.id)
    .then((question) => res.json(question))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/delete/:id", (req, res) => {
    questionSchema
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Question deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", (req, res) => {
    questionSchema
    .findById(req.params.id)
    .then((question) => {
      question.question = req.body.question;

      question
        .save()
        .then(() => res.json("Question updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
