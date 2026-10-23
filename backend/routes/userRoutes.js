const express = require("express");

const { getUser, registerUser, userByName } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUser);
router.post("/register", registerUser)
router.get("/:name", userByName)

module.exports = router;