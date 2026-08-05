const express = require("express");

const { registerUser, loginUser, getProfile, editProfile, logoutUser , changePassword } = require("../controllers/auth.controller");
const { authMiddleware, teacherMiddleware } = require("../middlewares/auth.middleware");
const { getAttemptOfStudent } = require("../controllers/teacher.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.post("/update", authMiddleware, editProfile)
router.post("/logout", authMiddleware, logoutUser)
router.patch("/change-password" , authMiddleware, changePassword)
router.get("/attempts/student/:userId", getAttemptOfStudent);

module.exports = router;