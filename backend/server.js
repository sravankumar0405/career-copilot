const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes)


const PORT = 5000;

app.listen(PORT, ()=> {
    console.log(`Server Running On ${PORT}`)
});