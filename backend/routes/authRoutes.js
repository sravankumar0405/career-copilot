const express = require("express");

const { registerUser, loginUser, deleteUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/loginUser", loginUser);

module.exports = router;