const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER route to create a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User Successfully created",
            user
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "email and password are required",
            })
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        })

        if(!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isMatchedPassword = await bcrypt.compare(
            password,
            user.password
        )

        if (!isMatchedPassword) {
            return res.status(401).json({
                message: "Incorrect Password",
            });
        }

        // Create a signed JWT after successful login
        const token = jwt.sign(
            {userId: user._id.toString()},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || "1h"}
        )

        // returns Success response successfully
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// DELETE route to remove user in the MongoDB (database) using this business logic with the user name 
const deleteUser = async (req, res) => {

    try {
        
        const userName = req.params.name;
        // Deletes the first document(user details) matching the name
        const deletedUser = await User.deleteOne({name: userName});

        if(!deletedUser) {
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

    }   catch (error) {
        // Handle malformed ObjectIDs or database connection errors
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser
}