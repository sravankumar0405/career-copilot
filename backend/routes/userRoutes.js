const express = require("express");

const { getUser, deleteUser, updateUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUser);
router.delete("/:name", deleteUser);

router.put("/update/:name", updateUser)

module.exports = router;