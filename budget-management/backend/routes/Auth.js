const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController.js");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;