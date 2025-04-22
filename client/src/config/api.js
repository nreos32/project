// API URL configuration
const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

// In production, we'll use relative URLs which will work with the server setup
export default API_URL;
