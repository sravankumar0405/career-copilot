const express = require("express");

const { registerUser, loginUser, deleteUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/loginUser", loginUser);
router.get("/users/:name", deleteUser)

// router.get("/search/user", (req, res)=> {
//     res.json({
//         name: req.query.name,
//     })
// })

module.exports = router;