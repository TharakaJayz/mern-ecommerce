const express = require('express');
const router = express.Router();
const orderController = require("../controllers/order");
const isAuth = require('../middleware/is-auth');


router.post("/new_order",isAuth,orderController.createOrder);
router.get("/all_orders",isAuth,orderController.getAllOrder);
router.get("/orderById/:ordID",isAuth,orderController.getOrderById);
router.delete("/deleteOrder/:ordID",isAuth,orderController.deleteOrder)


module.exports = router;