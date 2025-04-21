const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");
const Trade = require("../models/Trade");
const FriendRequest = require("../models/FriendRequest");

// Health check for /api/social/
router.get("/", (req, res) => {
  res.json({ message: "Social API is working" });
});

// --- Friend System ---
// Add friend (by username)
router.post("/friends/add", async (req, res) => {
  const { userId, friendUsername } = req.body;
  try {
    const user = await User.findById(userId);
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) return res.status(404).json({ message: "User not found" });
    if (user.friends.includes(friend._id))
      return res.status(400).json({ message: "Already friends" });
    user.friends.push(friend._id);
    friend.friends.push(user._id);
    await user.save();
    await friend.save();
    res.json({ message: "Friend added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List friends
router.get("/friends/list/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "friends",
      "username profileIcon lastOnline"
    );
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Friend Requests ---
// Send a friend request
router.post("/friends/request", async (req, res) => {
  const { fromUserId, toUsername } = req.body;
  try {
    const from = await User.findById(fromUserId);
    const to = await User.findOne({ username: toUsername });
    if (!to) return res.status(404).json({ message: "User not found" });
    if (from.friends.includes(to._id))
      return res.status(400).json({ message: "Already friends" });
    // Check for existing pending request
    const existing = await FriendRequest.findOne({
      from: from._id,
      to: to._id,
      status: "pending",
    });
    if (existing)
      return res.status(400).json({ message: "Request already sent" });
    const request = new FriendRequest({ from: from._id, to: to._id });
    await request.save();
    res.json({ message: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get incoming friend requests
router.get("/friends/requests/incoming/:userId", async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      to: req.params.userId,
      status: "pending",
    }).populate("from", "username profileIcon");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get outgoing friend requests
router.get("/friends/requests/outgoing/:userId", async (req, res) => {
  try {
    const requests = await FriendRequest.find({
      from: req.params.userId,
      status: "pending",
    }).populate("to", "username profileIcon");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Accept or decline a friend request
router.post("/friends/request/respond", async (req, res) => {
  const { requestId, accept } = req.body;
  try {
    const request = await FriendRequest.findById(requestId);
    if (!request || request.status !== "pending")
      return res.status(404).json({ message: "Request not found" });
    if (accept) {
      // Add each other as friends
      const fromUser = await User.findById(request.from);
      const toUser = await User.findById(request.to);
      if (!fromUser.friends.includes(toUser._id))
        fromUser.friends.push(toUser._id);
      if (!toUser.friends.includes(fromUser._id))
        toUser.friends.push(fromUser._id);
      await fromUser.save();
      await toUser.save();
      request.status = "accepted";
    } else {
      request.status = "declined";
    }
    await request.save();
    res.json({
      message: accept ? "Friend request accepted" : "Friend request declined",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Messaging ---
// Send message
router.post("/messages/send", async (req, res) => {
  const { from, to, content } = req.body;
  try {
    const message = new Message({ from, to, content });
    await message.save();
    res.json({ message: "Message sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get conversation
router.get("/messages/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { from: userId, to: friendId },
        { from: friendId, to: userId },
      ],
    }).sort({ sentAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Trades ---
// Offer trade
router.post("/trades/offer", async (req, res) => {
  const { from, to, offer, request } = req.body;
  try {
    console.log("Received trade offer:", { offer, request });

    // Create the trade with the card IDs sent from the client
    // These should be the actual card IDs (like "123") not MongoDB ObjectIDs
    const trade = new Trade({ from, to, offer, request });
    await trade.save();
    res.json({ message: "Trade offered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Respond to trade
router.post("/trades/respond", async (req, res) => {
  const { tradeId, status } = req.body;
  try {
    const trade = await Trade.findById(tradeId);
    if (!trade) return res.status(404).json({ message: "Trade not found" });
    trade.status = status;
    await trade.save();
    res.json({ message: `Trade ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List trades for user
router.get("/trades/:userId", async (req, res) => {
  try {
    const trades = await Trade.find({
      $or: [{ from: req.params.userId }, { to: req.params.userId }],
    });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
