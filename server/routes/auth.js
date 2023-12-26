const express = require("express");

const router = express.Router();

const authContoller = require('../controllers/auth');

router.post("/signUp",authContoller.signUp);
router.post("/login",authContoller.login)

module.exports = router;