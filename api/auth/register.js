import mongoose from "mongoose";
import User from "../../server/models/User.js";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      phone,
      password,
      isApproved: false,
    });

    await user.save();

    return res
      .status(201)
      .json({ message: "Registration successful. Await admin approval." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
