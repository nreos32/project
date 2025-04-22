// Vercel serverless function to list profile pictures
const fs = require("fs").promises;
const path = require("path");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const profilePicsPath = path.join(
      process.cwd(),
      "client",
      "public",
      "Assets",
      "ProfilePictures"
    );
    const files = await fs.readdir(profilePicsPath);
    res.json(files.filter((file) => /\.(png|jpe?g)$/i.test(file)));
  } catch (error) {
    console.error("Error reading profile pictures:", error);
    res.status(500).json({ error: "Failed to load profile pictures" });
  }
};
