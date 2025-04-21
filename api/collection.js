// Vercel serverless function for user collection management
const mongoose = require("mongoose");

// MongoDB connection (singleton pattern)
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

// Collection and User models
const cardSchema = new mongoose.Schema({
  cardId: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});
const collectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, ref: "User", required: true },
  cards: [cardSchema],
  lastOpened: { type: Date, default: Date.now },
});
const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = async (req, res) => {
  await connectDB();
  // Helper to get userId from body, query, or header
  const getUserId = () => {
    return (
      (req.method === "GET" ? req.query.userId : req.body && req.body.userId) ||
      req.headers["x-user-id"]
    );
  };

  if (req.method === "GET") {
    // Get user collection
    const userId = getUserId();
    if (!userId) return res.status(401).json({ error: "Missing userId" });
    try {
      const collection = await Collection.findOne({ userId });
      res.json(collection || { userId, cards: [] });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch collection" });
    }
  } else if (req.method === "POST") {
    if (req.url.endsWith("/add")) {
      // Add cards to collection
      const userId = getUserId();
      if (!userId) return res.status(401).json({ error: "Missing userId" });
      try {
        const { cards } = req.body;
        if (!Array.isArray(cards))
          return res.status(400).json({ error: "cards array required" });
        let collection = await Collection.findOne({ userId });
        if (!collection) {
          collection = new Collection({
            userId,
            username: req.body.username || "",
            cards: [],
          });
        }
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
    } else if (req.url.endsWith("/give")) {
      // Give a user a single card (admin only)
      try {
        const { username: targetUsername, cardId, quantity = 1 } = req.body;
        const targetUser = await User.findOne({
          username: new RegExp(`^${targetUsername}$`, "i"),
        });
        if (!targetUser)
          return res.status(404).json({ error: "Target user not found" });
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
        res.status(500).json({ error: "Failed to give card to user" });
      }
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
