const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  offer: [{ type: String, required: true }], // card IDs or item IDs
  request: [{ type: String, required: true }],
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trade", tradeSchema);
