require("dotenv").config()
const express = require("express");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"));

// user route
const authRouter = require("./routes/user.routes");
app.use("/api/user", authRouter);

// teacher route
const teacherRoute = require("./routes/teacher.routes")
app.use("/api/teacher", teacherRoute)

//  question route
const questionRoute = require("./routes/questions.routes");
app.use("/api/question" ,  questionRoute)

// quiz route
const quizRoute = require("./routes/quiz.routes")
app.use("/api/quiz" , quizRoute)


app.listen(port, () => {
    console.log(`server run on port ${port}`);
})

module.exports = app;