const express = require('express');
const router = express.Router();
const productController = require("../controllers/product");

router.post("/add_product",productController.createProduct);

module.exports = router;