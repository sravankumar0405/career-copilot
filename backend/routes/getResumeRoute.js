console.log("getResumeRoute loaded")

const express = require("express");

const { 
    getMyResumes,
    deleteResume 
} = require("../controllers/ResumeController");

const protect = require("../middleware/authMiddleware")

const router = express.Router();

// get route to get all user Resumes 
router.get(
    "/my-resumes",
    protect,
    getMyResumes
);

// delete route to delete particular user resume with id
router.delete("/:id", protect, deleteResume)


module.exports = router;