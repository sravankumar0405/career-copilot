
const User = require("../models/User");

// get Route to get all users in the MongoDB database
const getUser = async (req, res) => {

    const users = await User.find();

    res.json({
        success: true,
        users
    });
};

// DELETE route to remove user in the MongoDB (database) using this business logic with the user name 
const deleteUser = async (req, res) => {

    try {
        const userName = req.params.name;

        // Deletes the first document(user details) matching the name
        const deletedUser = await User.deleteOne({ name: userName });

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // returns Success response successfully
        res.status(200).json({
            success: true,
            message: "User deleted Successfully",
            user: deletedUser
        })

    } catch (error) {
        // Handle malformed ObjectIDs or database connection errors
        res.status(500).json({ message: "Server error", error: error.message });
    }

}

 // Find user by username and apply modifications and update the user details
const updateUser = async (req, res) => {
    const username  = req.params.name; // Get username from URL parmeters

    const updates = req.body;   // Get the fields to be updated

    try {
        const updatedUser = await User.findOneAndUpdate(
            { name: username },
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        );

        // If no user matches the provided username
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // returns Success response successfully
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        })

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong while updating',
            error: error.message
        })
    }

}


module.exports = {
    getUser,
    deleteUser,
    updateUser
}