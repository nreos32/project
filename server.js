const express = require("express");
const cors = require("cors");
const connectDB = require("./server/config/db");
const path = require("path");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Make sure these are defined BEFORE the static assets
app.use("/api/auth", require("./server/src/routes/authRoutes"));
app.use("/api/profiles", require("./server/src/routes/profileRoutes"));
app.use("/api/social", require("./server/src/routes/socialRoutes"));
app.use("/api/collection", require("./server/src/routes/collectionRoutes"));
app.use("/api", require("./server/src/routes/api"));

app.get("/api/pack-mewtwo", async (req, res) => {
  try {
    const Pack = require("./server/models/Pack");
    const packCards = await Pack.findOne({ name: "Mewtwo Pack" });
    res.json(packCards ? packCards.cards : []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pack data" });
  }
});

app.get("/api/collection", async (req, res) => {
  try {
    const Collection = require("./server/src/models/Collection");
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const collection = await Collection.findOne({ userId });
    res.json({ cards: collection ? collection.cards : [] });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch collection" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
