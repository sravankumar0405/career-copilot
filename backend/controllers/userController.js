const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

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
            user
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getUser = async (req, res) => {

    const users = await User.find();

    res.json({
        success: true,
        users
    });
};

const userByName = async (req, res) => {

    try {
        const userName = await User.findOne({
            name: req.params.name
        });

        if (!userName) {
            return res.status(404).json({
                message: "User not Found"
            })
        }

        res.json({
            success: true,
            userName
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


module.exports = {
    registerUser,
    getUser,
    userByName
}