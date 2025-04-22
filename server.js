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
app.use("/api", require("./server/src/routes/api"));

// Add a specific route for pack-mewtwo if it's not covered by the above
app.get("/api/pack-mewtwo", async (req, res) => {
  try {
    const Pack = require("./server/models/Pack");
    const packCards = await Pack.findOne({ name: "Mewtwo Pack" });
    res.json(packCards ? packCards.cards : []);
  } catch (error) {
    console.error("Error fetching Mewtwo pack:", error);
    res.status(500).json({ error: "Failed to fetch pack data" });
  }
});

// Add collection route if not covered above
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
    console.error("Error fetching collection:", error);
    res.status(500).json({ error: "Failed to fetch collection" });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
