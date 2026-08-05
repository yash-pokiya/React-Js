const express = require("express");

const { teacherMiddleware } = require("../middlewares/auth.middleware");
const { registerUser, loginUser, logoutUser, getProfile, editProfile } = require("../controllers/auth.controller");
const { getAllAttempts, getAttemptOfStudent, getAllQuizAndAttempts, getAllStudent, updateStudentStatus, getStudentData, updateStudent , getOwnQuizes, getAttemptsOnOwnQuiz} = require("../controllers/teacher.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", teacherMiddleware, getProfile);
router.patch("/update", teacherMiddleware, editProfile)
router.post("/logout", teacherMiddleware, logoutUser)
router.get("/attempts/all", teacherMiddleware, getAttemptsOnOwnQuiz)
router.get("/students/all", teacherMiddleware, getAllStudent) 
router.get("/own/quiz", teacherMiddleware, getOwnQuizes)
router.get("/attempts/:quizId", teacherMiddleware, getAllAttempts); 
router.patch("/student/status/update/:id", teacherMiddleware, updateStudentStatus)
router.get("/student/profile/:id", teacherMiddleware, getStudentData)
router.patch("/student/update/:id", teacherMiddleware, updateStudent)
router.get("/attempts/student/:id" , teacherMiddleware , getAttemptOfStudent)

module.exports = router;