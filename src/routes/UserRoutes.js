const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verify-token");
const authorize = require("../utils/authorize");
const UserController = require("../controllers/UserController");

router.get("/", verifyToken, authorize(["admin", "manager"]), UserController.getAllUsers);

module.exports = router;