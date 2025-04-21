// Vercel serverless function for getting Mewtwo Pack card list
const mongoose = require("mongoose");

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

const CardSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    type: String,
    rare: String,
    assetPath: String,
    rarities: Object,
  },
  { _id: false }
);
const PackSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  cards: [CardSchema],
});
const Pack = mongoose.models.Pack || mongoose.model("Pack", PackSchema);

module.exports = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    try {
      const pack = await Pack.findOne({ name: "Mewtwo Pack" });
      if (!pack) return res.status(404).json({ error: "Pack not found" });
      res.json(pack.cards);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch pack" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
