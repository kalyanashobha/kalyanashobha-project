const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Profile = require("../models/Profile");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "kalyanashobha_profiles",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

/* CREATE / UPDATE PROFILE */
router.post("/", upload.array("photos", 3), async (req, res) => {
  try {
    const photoUrls = req.files.map((file) => file.path);

    const profile = await Profile.findOneAndUpdate(
      { userId: req.body.userId },
      {
        ...req.body,
        photos: photoUrls,
      },
      { upsert: true, new: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Profile save failed" });
  }
});

/* GET ALL PROFILES */
router.get("/", async (req, res) => {
  const profiles = await Profile.find().populate("userId", "name");
  res.json(profiles);
});

module.exports = router;
