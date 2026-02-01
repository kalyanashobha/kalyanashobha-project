const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);



app.get("/", (req, res) => {
  res.send("KalyanaShobha API is running");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
