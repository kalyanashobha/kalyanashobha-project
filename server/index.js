const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const profileRoutes = require("./routes/profile");

const app = express();

/* ===== CORS (SAFE FOR TESTING) ===== */
app.use(
  cors({
    origin: true, // allow all origins dynamically
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);

/* ===== HEALTH CHECK ===== */
app.get("/", (req, res) => {
  res.send("KalyanaShobha API is running");
});

/* ===== DB + SERVER ===== */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT || 10000, () => {
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
