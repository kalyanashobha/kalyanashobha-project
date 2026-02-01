const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },

    // profile status
    isApproved: { type: Boolean, default: false },

    // role control
    role: { type: String, default: "user" }, // user | admin | agent
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
