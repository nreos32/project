const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

// Get list of profile pictures
router.get('/profile-pictures', async (req, res) => {
    try {
        const profilePicsPath = path.join(__dirname, '../../../client/public/assets/profilePictures');
        const files = await fs.readdir(profilePicsPath);
        res.json(files.filter(file => /\.(png|jpe?g)$/i.test(file)));
    } catch (error) {
        console.error('Error reading profile pictures:', error);
        res.status(500).json({ error: 'Failed to load profile pictures' });
    }
});

module.exports = router;
