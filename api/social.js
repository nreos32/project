// Vercel serverless function for social features (friends, friend requests, messaging)
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

// Models
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
const friendRequestSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});
const FriendRequest =
  mongoose.models.FriendRequest ||
  mongoose.model("FriendRequest", friendRequestSchema);
const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  sentAt: { type: Date, default: Date.now },
});
const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

module.exports = async (req, res) => {
  await connectDB();
  // Health check
  if (req.method === "GET" && req.url === "/") {
    return res.json({ message: "Social API is working" });
  }
  // Add friend
  if (req.method === "POST" && req.url.endsWith("/friends/add")) {
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
      return res.json({ message: "Friend added" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  // List friends
  if (req.method === "GET" && req.url.startsWith("/friends/list/")) {
    const userId = req.url.split("/").pop();
    try {
      const user = await User.findById(userId).populate(
        "friends",
        "username profileIcon lastOnline"
      );
      return res.json(user.friends);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  // Send friend request
  if (req.method === "POST" && req.url.endsWith("/friends/request")) {
    const { fromUserId, toUsername } = req.body;
    try {
      const from = await User.findById(fromUserId);
      const to = await User.findOne({ username: toUsername });
      if (!to) return res.status(404).json({ message: "User not found" });
      if (from.friends.includes(to._id))
        return res.status(400).json({ message: "Already friends" });
      const existing = await FriendRequest.findOne({
        from: from._id,
        to: to._id,
        status: "pending",
      });
      if (existing)
        return res.status(400).json({ message: "Request already sent" });
      const request = new FriendRequest({ from: from._id, to: to._id });
      await request.save();
      return res.json({ message: "Friend request sent" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  // Incoming friend requests
  if (
    req.method === "GET" &&
    req.url.startsWith("/friends/requests/incoming/")
  ) {
    const userId = req.url.split("/").pop();
    try {
      const requests = await FriendRequest.find({
        to: userId,
        status: "pending",
      }).populate("from", "username profileIcon");
      return res.json(requests);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  // Outgoing friend requests
  if (
    req.method === "GET" &&
    req.url.startsWith("/friends/requests/outgoing/")
  ) {
    const userId = req.url.split("/").pop();
    try {
      const requests = await FriendRequest.find({
        from: userId,
        status: "pending",
      }).populate("to", "username profileIcon");
      return res.json(requests);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  // Accept/decline friend request
  if (req.method === "POST" && req.url.endsWith("/friends/request/respond")) {
    const { requestId, accept } = req.body;
    try {
      const request = await FriendRequest.findById(requestId);
      if (!request || request.status !== "pending")
        return res.status(404).json({ message: "Request not found" });
      if (accept) {
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
      return res.json({
        message: accept ? "Friend request accepted" : "Friend request declined",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  // Send message
  if (req.method === "POST" && req.url.endsWith("/messages/send")) {
    const { from, to, content } = req.body;
    try {
      const message = new Message({ from, to, content });
      await message.save();
      return res.json({ message: "Message sent" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  // Get conversation
  if (req.method === "GET" && req.url.startsWith("/messages/")) {
    const parts = req.url.split("/");
    const userId = parts[2];
    const friendId = parts[3];
    try {
      const messages = await Message.find({
        $or: [
          { from: userId, to: friendId },
          { from: friendId, to: userId },
        ],
      }).sort({ sentAt: 1 });
      return res.json(messages);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  res.status(404).json({ error: "Not found" });
};
