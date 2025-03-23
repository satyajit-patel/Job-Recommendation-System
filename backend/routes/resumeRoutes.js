const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.user);

        const userId = req.user.id;
        const userDir = `uploads/${userId}`;

        // Check if directory exists, if not create it
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }

        cb(null, userDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Upload resume and get job recommendations using multer
router.post('/resume', authenticateToken, upload.single("resume"), resumeController.uploadAndProcess);

module.exports = router;
