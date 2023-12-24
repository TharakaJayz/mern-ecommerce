const express = require("express");

const router = express.Router();

const authContoller = require('../controllers/auth');

router.post("/signUp",authContoller.signUp);

module.exports = router;