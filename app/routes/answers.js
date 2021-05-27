const router = require("express").Router();
let answerSchema = require("../models/Answers");
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

  answerSchema
    .find()
    .then((answer) => res.json({ answer, canViewAnswer, canEdit }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const answer = req.body.answer;


  const newAnswer = new answerSchema({
    answer
  });

  newAnswer
    .save()
    .then(() => res.json("Answer added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
    answerSchema
    .findById(req.params.id)
    .then((answer) => res.json(answer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/delete/:id", (req, res) => {
    answerSchema
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Answer deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", (req, res) => {
    answerSchema
    .findById(req.params.id)
    .then((answer) => {
        answer.answer = req.body.answer;

        answer
        .save()
        .then(() => res.json("Answer updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
