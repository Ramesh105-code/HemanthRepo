const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(express.json());

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running at http://localhost:3000"));
  })
  .catch(err => console.error("MongoDB connection error:", err));
