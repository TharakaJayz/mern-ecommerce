const isEmptyValidator = require("../Validations/Validations");
const Product = require("../models/product");

exports.createProduct = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = parseInt(req.body.price);
  const quantity = parseInt(req.body.quantity);
  const brand = req.body.brand;
  const imageUrl = req.body.imageUrl;
  const categoryId = req.body.categoryId;
  let categoryName;
  const currentDate = new Date();

  try {
    if (
      isEmptyValidator([
        title,
        description,
        price,
        quantity,
        brand,
        imageUrl,
        categoryId,
      ])
    ) {
      const error = new Error("All Fields Should be FIled");
      error.statusCode = 400;
      return next(error);
    }
    if (categoryId === "1") {
      categoryName = "Mobile";
    } else if (categoryId === "2") {
      categoryName = "Laptop";
    } else {
      categoryName = "Tab";
    }

    if (
      !(typeof price === "number" && !Number.isNaN(price)) &&
      !(typeof quantity === "number" && !Number.isNaN(quantity))
    ) {
      const error = new Error("Price and quantity should be integer !");
      error.statusCode = 400;
      return next(error);
    }

    const exisitingProductCount = await Product.countDocuments({
      title: title,
    });
    if (exisitingProductCount !== 0) {
      const error = new Error("This Product Alredy exists !");
      error.statusCode = 400;
      return next(error);
    }

    const product = new Product({
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      brand: brand,
      imageUrl: imageUrl,
      category: {
        id: categoryId,
        name: categoryName,
      },
      createdAt: currentDate.toLocaleDateString(),
    });

    const createdProduct = await product.save();
    res.status(201).json({
      message: "product created Succefully !",
      details: product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    res.json({
      message: "product fetching successfull !",
      details: allProducts,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
