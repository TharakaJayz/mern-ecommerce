const mongoose = require("mongoose");

const Scehma = mongoose.Schema;

const deletedOrderSchema = new Scehma({
  custID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    required: true,
  },
  items: [
    {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Deletedorder", deletedOrderSchema);
