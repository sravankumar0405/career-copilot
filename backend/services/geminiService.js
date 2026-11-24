const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );


const model = genAI.getGenerativeModel({
  model: "gemini-3.8-flash",
});

console.log(
    process.env.GEMINI_API_KEY
);

console.log(
  "Gemini Service Loaded"
);

module.exports = model;




