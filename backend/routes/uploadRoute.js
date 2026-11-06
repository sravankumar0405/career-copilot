const express = require("express");

const { uploadResume } = require("../controllers/uploadController");
const upload = require("../middleware/uploadMiddleware")
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/upload", 
    protect, 
    upload.single("resume"),
    uploadResume
 );

 module.exports = router;