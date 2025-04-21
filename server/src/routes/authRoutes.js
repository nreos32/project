const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileIcon: user.profileIcon,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Prevent banned users from logging in
    if (user.banned) {
      return res.status(403).json({ error: "Your account has been banned" });
    }

    // Validate password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Update lastOnline
    user.lastOnline = new Date();
    await user.save();
    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileIcon: user.profileIcon,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update profile icon for a user
router.patch("/profile-icon", async (req, res) => {
  try {
    const { userId, profileIcon } = req.body;
    if (!userId || !profileIcon) {
      return res
        .status(400)
        .json({ error: "userId and profileIcon are required" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { profileIcon },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      message: "Profile icon updated",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileIcon: user.profileIcon,
      },
    });
  } catch (error) {
    console.error("Profile icon update error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Ban a user (admin only)
router.post("/ban", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { banned: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: `User ${username} has been banned.` });
  } catch (err) {
    console.error("Ban user error:", err);
    res.status(500).json({ error: "Failed to ban user" });
  }
});

// Unban a user (admin only)
router.post("/unban", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { banned: false },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: `User ${username} has been unbanned.` });
  } catch (err) {
    console.error("Unban user error:", err);
    res.status(500).json({ error: "Failed to unban user" });
  }
});

module.exports = router;
