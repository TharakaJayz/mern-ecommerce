const Product = require("../models/product");

exports.createOrder = async (req, res, next) => {
  const orderItems = req.body.orderItems;
  try {
    if (!orderItems) {
      const error = new Error("order items can not be empty");
      error.statusCode = 400;
      return next(error);
    }

    const createOrder = async () => {
      for (const orderdItem of orderItems) {
        const exisitingItem = await Product.findOne({ _id: orderdItem.id });

        if (!exisitingItem) {
          const error = new Error("cannot find product !");
          error.statusCode = 404;
          return next(error);
        }

        if (exisitingItem.quantity < orderdItem.ordqty) {
          const error = new Error("order cannot be accepted");
          error.statusCode = 400;
          return next(error);
        }

        const newUpdatedProduct = await Product.findByIdAndUpdate(
          { _id: orderdItem.id },
          {
            $set: {
              quantity: exisitingItem.quantity - orderdItem.ordqty,
            },
          },
          { new: true }
        );

        if (!newUpdatedProduct) {
          const error = new Error("error in update product quantity");
          error.statusCode = 500;
          return next(error);
        }
      }
    };

    createOrder();

    res.status(201).json({
      message: "order created succefully!",
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
