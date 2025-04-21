import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const API = "/api/social";

const Social = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const user = useSelector((state) => state.auth.user);
  const [friendUsername, setFriendUsername] = useState("");
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [friends, setFriends] = useState([]);
  const [reqLoading, setReqLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const [reqSuccess, setReqSuccess] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [msgLoading, setMsgLoading] = useState(false);

  // Fetch friend requests and friends list
  useEffect(() => {
    if (!user) return;
    const fetchRequests = async () => {
      try {
        const [inc, out, friendsList] = await Promise.all([
          fetch(`${API}/friends/requests/incoming/${user.id}`).then((r) =>
            r.json()
          ),
          fetch(`${API}/friends/requests/outgoing/${user.id}`).then((r) =>
            r.json()
          ),
          fetch(`${API}/friends/list/${user.id}`).then((r) => r.json()),
        ]);
        setIncoming(Array.isArray(inc) ? inc : []);
        setOutgoing(Array.isArray(out) ? out : []);
        setFriends(Array.isArray(friendsList) ? friendsList : []);
      } catch {}
    };
    fetchRequests();
  }, [user, reqSuccess]);

  // Fetch messages when a friend is selected
  useEffect(() => {
    if (!user || !selectedFriend) return;
    const fetchMessages = async () => {
      setMsgLoading(true);
      try {
        const res = await fetch(
          `${API}/messages/${user.id}/${selectedFriend._id}`
        );
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch {
        setMessages([]);
      } finally {
        setMsgLoading(false);
      }
    };
    fetchMessages();
  }, [user, selectedFriend]);

  // Send friend request
  const handleSendRequest = async (e) => {
    e.preventDefault();
    setReqLoading(true);
    setReqError("");
    setReqSuccess("");
    try {
      const res = await fetch(`${API}/friends/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromUserId: user.id,
          toUsername: friendUsername,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send request");
      setReqSuccess("Friend request sent!");
      setFriendUsername("");
    } catch (err) {
      setReqError(err.message);
    } finally {
      setReqLoading(false);
    }
  };

  // Accept/decline friend request
  const handleRespond = async (requestId, accept) => {
    setReqLoading(true);
    setReqError("");
    setReqSuccess("");
    try {
      const res = await fetch(`${API}/friends/request/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, accept }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to respond");
      setReqSuccess(data.message);
    } catch (err) {
      setReqError(err.message);
    } finally {
      setReqLoading(false);
    }
  };

  // Send a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedFriend) return;
    setMsgLoading(true);
    try {
      const res = await fetch(`${API}/messages/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: user.id,
          to: selectedFriend._id,
          content: messageInput,
        }),
      });
      if (res.ok) {
        setMessageInput("");
        // Refresh messages
        const msgRes = await fetch(
          `${API}/messages/${user.id}/${selectedFriend._id}`
        );
        const msgData = await msgRes.json();
        setMessages(Array.isArray(msgData) ? msgData : []);
      }
    } catch {}
    setMsgLoading(false);
  };

  // Helper to format last online
  function formatLastOnline(dateString) {
    if (!dateString) return "Unknown";
    const last = new Date(dateString);
    const now = new Date();
    const diffMs = now - last;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#001159", // Dark blue to match the sidebar
        padding: 0, // Remove all padding
        fontFamily: "Segoe UI, Arial, sans-serif",
        display: "flex",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          background: "#001159", // Dark blue background to match the sidebar
          padding: "20px", // Add some internal padding
          color: "#fff", // Text color
        }}
      >
        <h1
          style={{
            fontFamily: "Pokemon Solid, Arial Black, sans-serif",
            color: "#ffffff", // Light blue color for the title
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            fontSize: 38,
            marginBottom: 32,
            letterSpacing: 1.5,
            textAlign: "center",
          }}
        >
          Social!
        </h1>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 32,
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveTab("friends")}
            className={activeTab === "friends" ? "active" : ""}
            style={{
              padding: "10px 32px",
              borderRadius: 12,
              border: "none",
              background: activeTab === "friends" ? "#4657ce" : "#2c3e8c",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              boxShadow:
                activeTab === "friends" ? "0 2px 12px rgba(0,0,0,0.3)" : "none",
              cursor: "pointer",
              transition: "all 0.18s",
            }}
          >
            Friends
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={activeTab === "messages" ? "active" : ""}
            style={{
              padding: "10px 32px",
              borderRadius: 12,
              border: "none",
              background: activeTab === "messages" ? "#4657ce" : "#2c3e8c",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              boxShadow:
                activeTab === "messages"
                  ? "0 2px 12px rgba(0,0,0,0.3)"
                  : "none",
              cursor: "pointer",
              transition: "all 0.18s",
            }}
          >
            Messages
          </button>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            maxWidth: 1700,
            color: "#333", // Reset text color for this container
            minHeight: "calc(100vh - 280px)", // Subtract the height of the header and padding
            marginBottom: 20, // Add margin at the bottom
          }}
        >
          {activeTab === "friends" && (
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 16 }}>Friends List</h2>
              <div>
                {friends.length === 0 ? (
                  <div style={{ color: "#888", fontSize: 18 }}>
                    No friends yet.
                  </div>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {friends.map((friend) => (
                      <li
                        key={friend._id}
                        style={{
                          marginBottom: 12,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={require(`../Assets/ProfilePictures/${friend.profileIcon}`)}
                          alt="profile"
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            marginRight: 12,
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = require("../Assets/ProfilePictures/PROFILE_ICON_100020_SIRNIGHT.png");
                          }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div style={{ fontWeight: 600 }}>
                            {friend.username}
                          </div>
                          <div style={{ color: "#888" }}>
                            Last online: {formatLastOnline(friend.lastOnline)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <form
                onSubmit={handleSendRequest}
                style={{ display: "flex", marginTop: 20 }}
              >
                <input
                  type="text"
                  placeholder="Enter username to add"
                  value={friendUsername}
                  onChange={(e) => setFriendUsername(e.target.value)}
                  disabled={reqLoading}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 12,
                    border: "1px solid #ccc",
                    marginRight: 10,
                  }}
                />
                <button
                  type="submit"
                  disabled={reqLoading || !friendUsername}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 12,
                    border: "none",
                    background: "#3b4cca",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}
                >
                  Send Request
                </button>
              </form>
              {reqError && <div style={{ color: "red" }}>{reqError}</div>}
              {reqSuccess && <div style={{ color: "green" }}>{reqSuccess}</div>}
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: 20 }}>Incoming Friend Requests</h3>
                {incoming.length === 0 ? (
                  <div style={{ color: "#888", fontSize: 16 }}>
                    No incoming requests.
                  </div>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {incoming.map((req) => (
                      <li
                        key={req._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 12,
                        }}
                      >
                        <img
                          src={require(`../Assets/ProfilePictures/${
                            req.from?.profileIcon ||
                            "PROFILE_ICON_100020_SIRNIGHT.png"
                          }`)}
                          alt="profile"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            marginRight: 12,
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = require("../Assets/ProfilePictures/PROFILE_ICON_100020_SIRNIGHT.png");
                          }}
                        />
                        <span style={{ fontWeight: 600, flex: 1 }}>
                          {req.from?.username || "Unknown"}
                        </span>
                        <div>
                          <button
                            style={{
                              marginRight: 8,
                              padding: "6px 12px",
                              borderRadius: 8,
                              border: "none",
                              background: "#4caf50",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                            onClick={() => handleRespond(req._id, true)}
                            disabled={reqLoading}
                          >
                            Accept
                          </button>
                          <button
                            style={{
                              padding: "6px 12px",
                              borderRadius: 8,
                              border: "none",
                              background: "#f44336",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                            onClick={() => handleRespond(req._id, false)}
                            disabled={reqLoading}
                          >
                            Decline
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: 20 }}>Outgoing Friend Requests</h3>
                {outgoing.length === 0 ? (
                  <div style={{ color: "#888", fontSize: 16 }}>
                    No outgoing requests.
                  </div>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {outgoing.map((req) => (
                      <li
                        key={req._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 12,
                        }}
                      >
                        <img
                          src={require(`../Assets/ProfilePictures/${
                            req.to?.profileIcon ||
                            "PROFILE_ICON_100020_SIRNIGHT.png"
                          }`)}
                          alt="profile"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            marginRight: 12,
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = require("../Assets/ProfilePictures/PROFILE_ICON_100020_SIRNIGHT.png");
                          }}
                        />
                        <span style={{ fontWeight: 600 }}>
                          {req.to?.username || "Unknown"}
                        </span>{" "}
                        <span style={{ color: "#888", marginLeft: 8 }}>
                          (pending)
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          {activeTab === "messages" && (
            <div>
              <h2 style={{ fontSize: 24, marginBottom: 16 }}>Messages</h2>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 20, marginBottom: 12 }}>
                    Your Friends
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {friends.map((friend) => (
                      <li
                        key={friend._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: 10,
                          borderRadius: 8,
                          cursor: "pointer",
                          background:
                            selectedFriend && selectedFriend._id === friend._id
                              ? "#e3eaff"
                              : "#fff",
                          marginBottom: 8,
                          boxShadow:
                            selectedFriend && selectedFriend._id === friend._id
                              ? "0 2px 8px rgba(0, 0, 0, 0.2)"
                              : "none",
                        }}
                        onClick={() => setSelectedFriend(friend)}
                      >
                        <img
                          src={require(`../Assets/ProfilePictures/${friend.profileIcon}`)}
                          alt="profile"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            marginRight: 10,
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = require("../Assets/ProfilePictures/PROFILE_ICON_100020_SIRNIGHT.png");
                          }}
                        />
                        {friend.username}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ flex: 2 }}>
                  {selectedFriend ? (
                    <div
                      style={{
                        background: "#f9f9f9",
                        borderRadius: 12,
                        padding: 20,
                        height: 575,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          overflowY: "auto",
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 600,
                            marginBottom: 10,
                          }}
                        >
                          Chat with {selectedFriend.username}
                        </div>
                        <div style={{ maxHeight: 300, overflowY: "auto" }}>
                          {msgLoading ? (
                            <div style={{ color: "#888" }}>Loading...</div>
                          ) : messages.length === 0 ? (
                            <div style={{ color: "#888" }}>
                              No messages yet.
                            </div>
                          ) : (
                            messages.map((msg) => (
                              <div
                                key={msg._id}
                                style={{
                                  marginBottom: 12,
                                  display: "flex",
                                  flexDirection:
                                    msg.from === user.id
                                      ? "row-reverse"
                                      : "row",
                                }}
                              >
                                <span
                                  style={{
                                    background:
                                      msg.from === user.id ? "#dcf8c6" : "#fff",
                                    padding: "10px 15px",
                                    borderRadius: 20,
                                    maxWidth: "80%",
                                    boxShadow:
                                      msg.from === user.id
                                        ? "0 2px 8px rgba(0, 0, 0, 0.2)"
                                        : "none",
                                  }}
                                >
                                  {msg.content}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                      <form
                        onSubmit={handleSendMessage}
                        style={{ display: "flex" }}
                      >
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type a message..."
                          disabled={msgLoading}
                          style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: 12,
                            border: "1px solid #ccc",
                            marginRight: 10,
                          }}
                        />
                        <button
                          type="submit"
                          disabled={msgLoading || !messageInput.trim()}
                          style={{
                            padding: "10px 20px",
                            borderRadius: 12,
                            border: "none",
                            background: "#3b4cca",
                            color: "#fff",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.18s",
                          }}
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div style={{ color: "#888" }}>
                      Select a friend to start chatting.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Social;
