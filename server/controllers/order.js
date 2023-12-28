const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

exports.createOrder = async (req, res, next) => {
  const orderItems = req.body.orderItems;
  const userEmail = req.body.userEmail;
  try {
    if (!orderItems || !userEmail) {
      const error = new Error("order items or userEmail can not be empty");
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

    const orderdUser = await User.findOne({ email: userEmail });
    if (!orderdUser) {
      const error = new Error("This user does not exist!");
      error.statusCode = 404;
      return next(error);
    }
    const exsistingProducts = await Product.find();
    if (!exsistingProducts) {
      const error = new Error("Error in finding products in DB!");
      error.statusCode = 500;
      return next(error);
    }

    const orderdItemsList = orderItems.map((singleOrderdItem) => {
      for (const exsistProduct of exsistingProducts) {
        if (singleOrderdItem.id === exsistProduct._id.toHexString()) {
          return {
            title: exsistProduct.title,
            price: exsistProduct.price,
            quantity: exsistProduct.quantity,
            imageUrl: exsistProduct.imageUrl,
          };
        }
      }
    });

    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const order = new Order({
      custID: orderdUser._id.toHexString(),
      createdAt: `${currentDate.toLocaleDateString()}-${formattedTime}`,
      status: "Ongoing",
      deliveryStatus: "Ongoing",
      items: orderdItemsList,
    });

    const newOrder = await order.save();
    if (!newOrder) {
      const error = new Error("erro when creating new order");
      error.statusCode = 500;
      return next(error);
    }
    createOrder();

    res.status(201).json({
      message: "order created succefully!",
      details: newOrder,
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await Order.find();
    console.log("all order in backend", allOrder);
    res.status(200).json({
      messsage: "order fetching successfull",
      details: allOrder,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
