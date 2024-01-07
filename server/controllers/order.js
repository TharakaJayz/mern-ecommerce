const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const DeletedOrder = require("../models/DeleteOrder");

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
            quantity: singleOrderdItem.ordqty,
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

exports.deleteOrder = async (req, res, next) => {
  const ordId = req.params.ordID;
  try {
    const deletedOrder = await Order.findOneAndUpdate(
      { _id: ordId },
      {
        $set: {
          status: "Canceled",
        },
      },
      {
        new: true,
      }
    );
    if (!deletedOrder) {
      const error = new Error("this order Could not find");
      error.statusCode = 404;
      return next(error);
    }
    res.status(201).json({ message: "order deletion successfull !" });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  const ordId = req.params.ordID;
  try {
    const requiredOrder = await Order.findById({ _id: ordId });
    if (!requiredOrder) {
      const error = new Error("This order does not exsist");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "order fetching by id successfull!",
      details: requiredOrder,
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.deleteOrderById = async (req, res, next) => {
  const ordId = req.params.ordID;
  try {
    const exisitingOrder = await Order.findByIdAndDelete(ordId);
    if (!exisitingOrder) {
      const error = new Error("This order could not delted !");
      error.statusCode = 400;
      return next(error);
    }

    // crate new data

    const deltedOrder = new DeletedOrder({
      custID: exisitingOrder.custID,
      createdAt: exisitingOrder.createdAt,
      status: exisitingOrder.status,
      deliveryStatus: exisitingOrder.deliveryStatus,
      items: exisitingOrder.items,
    });

    const deletedOrder = await deltedOrder.save();

    if (!deletedOrder) {
      console.log("creating deleted order error !");
      return;
    }
    // console.log("deleted product",exisitingOrder);

    if (!exisitingOrder) {
      const error = new Error("Erorr when deleting order !");
      error.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      message: "Order deltion successfull !",
      data: exisitingOrder,
    });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

exports.deliverOrder = async (req, res, next) => {
  const ordId = req.params.ordID;

  try {
    const exisitingOrderForDeliver = await Order.findByIdAndUpdate(
      { _id: ordId },
      {
        $set: {
          deliveryStatus: "Delivered",
        },
      },
      {
        new: true,
      }
    );
    if (!exisitingOrderForDeliver) {
      const error = new Error("this order could not be deliverd!");
      error.statusCode = 400;
      return next(error);
    }
    res
      .status(200)
      .json({
        message: "order Updation Successfull !",
        details: exisitingOrderForDeliver,
      });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
