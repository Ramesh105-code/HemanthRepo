require("dotenv").config();
const express = require("express");
Assignment: Book Library API
Problem Statement
Create a simple Book Library REST API using Node.js, Express, and MongoDB.

Requirements
Setup

Initialize a Node.js project with express and mongoose.
Create a MongoDB database named libraryDB.
Models

Create a Book schema with the following fields:

title (string, required)
author (string, required)
publishedYear (number)
genre (string)
available (boolean, default: true)
APIs to Implement

POST /books → Add a new book.

GET /books → Get all books. Support query params:

author → filter books by author.
available=true/false → filter books by availability.
PATCH /books/:id → Update availability status of a book (toggle true/false).

DELETE /books/:id → Delete a book.

Extra Challenge

Add pagination to the GET /books API using ?page= and ?limit= query parameters.
Return total count of books in the response.const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/books");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
