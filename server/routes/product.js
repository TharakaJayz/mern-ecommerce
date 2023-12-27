const express = require('express');
const router = express.Router();
const productController = require("../controllers/product");
const isAuth = require("../middleware/is-auth");

router.post("/add_product",isAuth,productController.createProduct);
router.get("/all_products",productController.getAllProducts);

module.exports = router;