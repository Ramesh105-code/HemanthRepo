const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/student.routes");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());


connectDB();


app.use("/students", studentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
