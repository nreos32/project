const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const collectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    ref: "User",
    required: true,
  },
  cards: [cardSchema],
  lastOpened: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Collection model
module.exports = mongoose.model("Collection", collectionSchema);
