const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { matchResumeWithJD } = require("../controllers/jobMatchController");

router.post(
    "/:id",
    protect,
    matchResumeWithJD
);

module.exports = router;