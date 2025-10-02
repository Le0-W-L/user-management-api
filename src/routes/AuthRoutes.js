const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verify-token");
const authController = require("../controllers/AuthController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", verifyToken, authController.getProfile);

module.exports = router;