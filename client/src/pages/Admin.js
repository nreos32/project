import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");

  // Command handling: supports 'give <userId> <cardId> [quantity]'
  const handleCommandKey = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!command.trim()) return;
      const parts = command.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      let output = "";
      if (cmd === "give" || cmd === "/give") {
        const usernameArg = parts[1];
        const cardId = parseInt(parts[2], 10);
        const quantity = parts[3] ? parseInt(parts[3], 10) : 1;
        if (!usernameArg || isNaN(cardId) || isNaN(quantity)) {
          output = "Usage: give|/give <username> <cardId> [quantity]";
        } else {
          try {
            const res = await fetch(
              "http://localhost:5000/api/collection/give",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: usernameArg,
                  cardId,
                  quantity,
                }),
              }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to give card");
            output = `Gave ${quantity} of card ${cardId} to user ${usernameArg}`;
          } catch (err) {
            output = `Error: ${err.message}`;
          }
        }
      } else if (cmd === "ban" || cmd === "/ban") {
        const usernameArg = parts[1];
        if (!usernameArg) {
          output = "Usage: ban|/ban <username>";
        } else {
          try {
            const res = await fetch("http://localhost:5000/api/auth/ban", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username: usernameArg }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to ban user");
            output = data.message;
          } catch (err) {
            output = `Error: ${err.message}`;
          }
        }
      } else if (cmd === "unban" || cmd === "/unban") {
        const usernameArg = parts[1];
        if (!usernameArg) {
          output = "Usage: unban|/unban <username>";
        } else {
          try {
            const res = await fetch("http://localhost:5000/api/auth/unban", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username: usernameArg }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to unban user");
            output = data.message;
          } catch (err) {
            output = `Error: ${err.message}`;
          }
        }
      } else if (cmd === "help" || cmd === "/help") {
        output =
          "Available commands:\n" +
          "- give, /give <username> <cardId> [quantity]\n" +
          "- ban, /ban <username>\n" +
          "- unban, /unban <username>\n" +
          "- help";
      } else {
        output = `Unknown command: ${cmd}`;
      }
      setHistory((h) => [...h, { cmd: command, output }]);
      setCommand("");
    }
  };

  // If user is not admin, redirect
  if (!user || user.username !== "admin") {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div style={{ padding: "24px" }}>
      <h2>Console</h2>
      <div
        style={{
          background: "#000",
          color: "#0f0",
          padding: "12px",
          height: "400px",
          overflowY: "auto",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
        }}
      >
        {history.map((entry, i) => (
          <div key={i}>
            <div>&gt; {entry.cmd}</div>
            <div>{entry.output}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleCommandKey}
        placeholder="Enter command..."
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "8px",
          fontFamily: "monospace",
        }}
      />
    </div>
  );
};

export default Admin;
