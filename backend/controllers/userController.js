
const User = require("../models/User");



const getUser = async (req, res) => {

    const users = await User.find();

    res.json({
        success: true,
        users
    });
};





module.exports = {
    registerUser,
    getUser,
    loginUser
}