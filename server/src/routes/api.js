const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Profile routes
router.get('/profiles', async (req, res) => {
    try {
        const [profiles] = await db.execute('SELECT * FROM user_profiles');
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profiles' });
    }
});

router.post('/profiles', async (req, res) => {
    const { userId, profilePicture } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO user_profiles (user_id, profile_picture) VALUES (?, ?)',
            [userId, profilePicture]
        );
        res.json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save profile' });
    }
});

// Test DB connection
router.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT 1');
        res.json({ message: 'Database connection successful' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

module.exports = router;
