const mongoose = require("mongoose");

const RaritySchema = new mongoose.Schema(
  {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
  { _id: false }
);

const CardSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String },
    rare: { type: String },
    assetPath: { type: String, required: true },
    rarities: { type: RaritySchema, required: true },
  },
  { _id: false }
);

const PackSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  cards: [CardSchema],
});

module.exports = mongoose.model("Pack", PackSchema);
