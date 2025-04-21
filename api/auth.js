// Vercel serverless function for authentication (register & login)
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// MongoDB connection (singleton pattern for serverless)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set");
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

// User model (copied from your server/src/models/User.js)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  profileIcon: { type: String, default: "PROFILE_ICON_100020_SIRNIGHT.png" },
  type: { type: String, enum: ["user", "admin"], default: "user" },
  banned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lastOnline: { type: Date, default: Date.now },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Helper to get the action (register/login) from the path or query
function getAction(req) {
  // Vercel serverless functions route /api/auth/login to /api/auth.js with req.url = "/login"
  // or /api/auth?login
  if (req.url.endsWith("/register") || req.url === "/register")
    return "register";
  if (req.url.endsWith("/login") || req.url === "/login") return "login";
  // Support /api/auth?login or /api/auth?register
  if (req.query && req.query.action) return req.query.action;
  if (req.url.includes("?")) {
    const params = new URLSearchParams(req.url.split("?")[1]);
    if (params.has("action")) return params.get("action");
    if (params.has("login")) return "login";
    if (params.has("register")) return "register";
  }
  return null;
}

module.exports = async (req, res) => {
  try {
    await connectDB();
    // Parse body if not already parsed (Vercel may not parse JSON automatically)
    if (!req.body && req.method === "POST") {
      let body = "";
      await new Promise((resolve) => {
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", resolve);
      });
      try {
        req.body = JSON.parse(body);
      } catch {
        req.body = {};
      }
    }
    // Determine action
    const action = getAction(req);
    if (req.method === "POST" && action === "register") {
      // Register
      try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User already exists" });
        user = new User({ username, email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        return res.status(201).json({
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            profileIcon: user.profileIcon,
          },
        });
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }
    } else if (req.method === "POST" && action === "login") {
      // Login
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
          return res.status(400).json({ error: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ error: "Invalid credentials" });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        return res.json({
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            profileIcon: user.profileIcon,
          },
        });
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    console.error("/api/auth.js top-level error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
