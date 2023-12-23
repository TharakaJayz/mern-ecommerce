const express = require("express");

const router = express.Router();

const authContoller = require('../controllers/auth');

router.get("/signIn",authContoller.signIN);

module.exports = router;