const express = require("express");
const cors = require("cors");
const user = require("./app/routes/user.js");
const quiz = require("./app/routes/quiz.js");
const questions = require("./app/routes/questions.js");
const answers = require("./app/routes/answers.js");
require("dotenv").config();
require("./app/config/db.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Quiz Manager application" });
});

app.use("/user", user);
app.use("/quiz/new", quiz);
app.use("/quiz/questions", questions);
app.use("/quiz/answers", answers);

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
