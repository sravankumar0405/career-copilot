const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const uploadRoute = require("./routes/uploadRoute");
const getRusumeRoute = require("./routes/getResumeRoute");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes)

app.use("/api/users", authRoutes);

app.use("/api/resume", uploadRoute);
app.use("/api/resume", getRusumeRoute);


app.get("/", (req, res) => {
    res.send("Backend is running");

    console.log("Server running on 5000")
})


const PORT = 5000;

app.listen(PORT, ()=> {
    console.log(`Server Running On ${PORT}`)
});

