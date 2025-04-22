const express = require("express");
const path = require("path");
const apiRoutes = require('./server/src/routes/api');
const profileRoutes = require('./server/src/routes/profileRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/public")));

// API Routes
app.use('/api', apiRoutes);
app.use('/api', profileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Serve React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/public", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
