const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");

const app = express();
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", bookRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running at http://localhost:3000"));
  })
  .catch(err => console.error("MongoDB connection error:", err));
