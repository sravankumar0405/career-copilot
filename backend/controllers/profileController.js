const User = require("../models/User");

// Get Profile route
const getProfile = async (req, res)=> {
    
    const user = await User.findById(
        req.user.id
    ).select("-password");

    console.log(req.user);

    res.json({
        success: true,
        message: "You're Authorized to access the User Profile/Me page",
        user
    });
};

module.exports = {
    getProfile
}