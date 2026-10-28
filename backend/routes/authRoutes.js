const express = require("express");

const { registerUser, loginUser, deleteUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/loginUser", loginUser);
router.get("/users/:name", deleteUser);

module.exports = router;