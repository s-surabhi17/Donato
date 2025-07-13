const express = require("express");
const router = express.Router();
const FoodDonation = require("../models/foodDonation.model");

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

// @route   POST /
// @desc    Save a food donation entry
// @access  Private
router.post("/", isAuthenticated, async (req, res) => {
  try {
    console.log("✅ User ID:", req.user?._id);
    console.log("📦 Donation data received:", req.body);

    const newDonation = new FoodDonation({
      user: req.user._id,
      ...req.body,
    });

    await newDonation.save();

    res.status(201).json({
      success: true,
      message: "Donation posted successfully.",
    });
  } catch (error) {
    console.error("❌ Food donation error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;
