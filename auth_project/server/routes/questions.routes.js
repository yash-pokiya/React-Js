const express = require("express");

const { teacherMiddleware, authMiddleware } = require("../middlewares/auth.middleware");
const { createQuestion, readQuestion, updateQuestion, deleteQuestion } = require("../controllers/questions.controller")

const router = express.Router();

router.post("/create", teacherMiddleware, createQuestion)
router.get("/read/:id", authMiddleware, readQuestion)
router.patch("/update/:id", teacherMiddleware, updateQuestion)
router.delete("/delete/:id", teacherMiddleware, deleteQuestion)


module.exports = router;