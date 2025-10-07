const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verify-token");
const authorize = require("../utils/authorize");
const userController = require("../controllers/UserController");



module.exports = router;