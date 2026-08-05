const express = require("express");

const { teacherMiddleware, authMiddleware } = require("../middlewares/auth.middleware");
const { createQuiz, readQuiz, updateQuiz, deleteQuiz, updateStatus, takeQuiz, submitQuiz , readAll } = require("../controllers/quiz.controller")

const router = express.Router();

router.post("/create", teacherMiddleware, createQuiz)
router.get("/all" , authMiddleware , readAll)
router.get("/read/:id", authMiddleware, readQuiz)
router.patch("/update/:id", teacherMiddleware, updateQuiz)
router.delete("/delete/:id", teacherMiddleware, deleteQuiz)
router.patch("/status/:id", teacherMiddleware, updateStatus)
router.get("/take/:id", authMiddleware, takeQuiz)
router.post("/submit/:id", authMiddleware, submitQuiz)

module.exports = router;