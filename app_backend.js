const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const logRequests = require("./middlewares/requestlogs");
const helmet = require("helmet");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logRequests);

const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const courseRoutes = require("./Routes/courseRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/course", courseRoutes);

async function startServer() {
  if (!process.env.DATABASE_URL) {
    console.error("Missing Database Connection String.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Successfully connected to the database!");
  } catch (e) {
    console.error("Error Connecting to the database!", e);
    process.exit(1);
  }
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log("Backend is running at http://localhost:3000");
  });
}

startServer();

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  await mongoose.disconnect();
  console.log("Successfully Disconnected to the database!");
  process.exit(0);
});
