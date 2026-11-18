const Resume = require("../models/Resume");

const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const uploadResume = async (req, res) => {
  try {

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    // Read uploaded PDF
    const dataBuffer = fs.readFileSync(
      req.file.path
    );

    const parser = new PDFParse({
      data: dataBuffer
    })

    // Extract text from PDF
    const pdfData = await parser.getText()

    console.log(pdfData);

    // Save to MongoDB
    const resume = await Resume.create({
      user: req.user.id,

      fileName:
        req.file.originalname,

      filePath:
        req.file.path,

      extractedText:
        pdfData.text,
    });

    res.status(201).json({
      success: true,
      message:
        "Resume uploaded successfully",
      resume,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

module.exports = {
  uploadResume,
};