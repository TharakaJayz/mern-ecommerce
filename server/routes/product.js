const express = require('express');
const router = express.Router();
const productController = require("../controllers/product");

router.post("/add_product",productController.createProduct);
router.get("/all_products",productController.getAllProducts);

module.exports = router;