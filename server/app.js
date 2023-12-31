const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/product",productRoutes);
app.use("/order",orderRoutes)

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

try {
  mongoose.connect(
    "mongodb+srv://tharakaprabhath300:Tp0718736614@cluster0.zmt7ut1.mongodb.net/EAD?retryWrites=true&w=majority"
  );
  app.listen(8080, () => {
    console.log("connected to 8080");
  });
} catch (err) {
  console.log("mongoose error", err);
}
