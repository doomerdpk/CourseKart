const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const logRequests = require("./middlewares/requestlogs");

app.use(cors());
app.use(express.json());
//app.use(logRequests);

const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const courseRoutes = require("./Routes/courseRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/course", courseRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Successfully connected to the database!");
  } catch (e) {
    console.log("Error Connecting to the database!");
  }

  app.listen(3000, function () {
    console.log("Backend is running at http://localhost:3000");
  });
}

startServer();
