const getUsers = (req, res) => {
    res.json({
        success: true,
        users: [],
        message: "Get user successfully"
    });
};

const registerUser = (req, res) => {
    console.log(req.body);
    
    const { name, email } = req.body;

    res.json({
        success: true,
        name,
        email,
    })
}

module.exports = {
    getUsers,
    registerUser,
}