// Create web server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Comment = require("./models/comment"); // Import the Comment model
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/commentsDB";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("views"));

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the Comment schema and model
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
});
const Comment = mongoose.model("Comment", commentSchema);

// listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
