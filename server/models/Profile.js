const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    age: Number,
    gender: String,
    religion: String,
    caste: String,
    education: String,
    profession: String,
    income: String,
    location: String,

    photos: [String], // Cloudinary URLs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
