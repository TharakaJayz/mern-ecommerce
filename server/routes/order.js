const express = require('express');
const router = express.Router();
const orderController = require("../controllers/order");
const isAuth = require('../middleware/is-auth');
router.post("/new_order",isAuth,orderController.createOrder);



module.exports = router;