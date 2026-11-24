const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

console.log(
  "Gemini API key loaded:",
  !!process.env.GEMINI_API_KEY
);

const path = require("path")

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const uploadRoute = require("./routes/uploadRoute");
const getRusumeRoute = require("./routes/getResumeRoute");

const aiRoute = require("./routes/aiRoutes");

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes)

app.use("/api/users", authRoutes);

app.use("/api/resume", uploadRoute);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use("/api/resume", getRusumeRoute);

app.use("/api/ai", aiRoute);


app.get("/", (req, res) => {
    res.send("Backend is running");

})

const PORT = 5000;

app.listen(PORT, ()=> {
    console.log(`Server Running On ${PORT}`)
});


