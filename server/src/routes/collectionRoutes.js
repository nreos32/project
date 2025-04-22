// Collection management routes for user card collections
const express = require("express");
const router = express.Router();
// Add console logging to debug model loading
console.log("Loading Collection model in collectionRoutes.js");
const Collection = require("../models/Collection");
console.log("Collection model loaded successfully");
const Pack = require("../../models/Pack");
const User = require("../models/User");

// Middleware to get userId from JWT (expects req.userId)
function requireUser(req, res, next) {
  // Accept userId from body (POST), query (GET), or header
  const userId =
    (req.method === "GET" ? req.query.userId : req.body && req.body.userId) ||
    req.headers["x-user-id"];
  if (!userId) return res.status(401).json({ error: "Missing userId" });
  req.userId = userId;
  next();
}

// GET /api/collection - Get current user's collection
router.get("/", requireUser, async (req, res) => {
  try {
    const collection = await Collection.findOne({ userId: req.userId });
    res.json(collection || { userId: req.userId, cards: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch collection" });
  }
});

// POST /api/collection/add - Add cards to user's collection (e.g., after opening a pack)
router.post("/add", requireUser, async (req, res) => {
  try {
    const { cards } = req.body; // [{ cardId, quantity }]
    if (!Array.isArray(cards))
      return res.status(400).json({ error: "cards array required" });
    let collection = await Collection.findOne({ userId: req.userId });
    if (!collection) {
      collection = new Collection({
        userId: req.userId,
        username: req.body.username || "",
        cards: [],
      });
    }
    // Add/update cards
    for (const { cardId, quantity } of cards) {
      const idx = collection.cards.findIndex((c) => c.cardId === cardId);
      if (idx >= 0) {
        collection.cards[idx].quantity += quantity;
      } else {
        collection.cards.push({ cardId, quantity });
      }
    }
    await collection.save();
    res.json(collection);
  } catch (err) {
    res.status(500).json({ error: "Failed to add cards to collection" });
  }
});

// POST /api/collection/give - Give a user a single card (admin only)
router.post("/give", async (req, res) => {
  try {
    const { username: targetUsername, cardId, quantity = 1 } = req.body;
    // Find target user by username (case-insensitive)
    const targetUser = await User.findOne({
      username: new RegExp(`^${targetUsername}$`, "i"),
    });
    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found" });
    }
    const userId = targetUser._id.toString();
    let collection = await Collection.findOne({ userId });
    if (!collection) {
      collection = new Collection({
        userId,
        username: targetUsername,
        cards: [],
      });
    }
    const idx = collection.cards.findIndex((c) => c.cardId === cardId);
    if (idx >= 0) {
      collection.cards[idx].quantity += quantity;
    } else {
      collection.cards.push({ cardId, quantity });
    }
    await collection.save();
    res.json(collection);
  } catch (err) {
    console.error("Give card error:", err);
    res.status(500).json({ error: "Failed to give card to user" });
  }
});

// GET /api/pack/mewtwo - Get Mewtwo Pack card list
router.get("/pack/mewtwo", async (req, res) => {
  try {
    const pack = await Pack.findOne({ name: "Mewtwo Pack" });
    if (!pack) return res.status(404).json({ error: "Pack not found" });
    res.json(pack.cards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pack" });
  }
});

module.exports = router;
