const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* GET all users (admin) */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* APPROVE user */
router.put("/approve/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      isApproved: true,
    });

    res.json({ message: "User approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
});

module.exports = router;
