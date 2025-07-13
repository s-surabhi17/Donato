// 

//new
const express = require("express");
const router = express.Router();
const User = require("../models/user.model"); // Adjust the path if needed
const bcrypt = require("bcryptjs");

// @route   POST /auth/signup
// @desc    Register user with role
// @access  Public
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Name, email, password, and role are required" });
  }

  if (!["donor", "ngo", "volunteer", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role provided" });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    // Hash the password here, inside the async function
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({ 
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        id: newUser._id,
      }
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// This route returns user info if already authenticated
router.get("/", (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;