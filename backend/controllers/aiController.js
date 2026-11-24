const Resume = require("../models/Resume");
const model = require("../services/geminiService");

const analyzeResume = async (req, res) => {
    try {

        const resume =
            await Resume.findById(
                req.params.id
            );

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            })
        }

        const prompt = `
            You are an ATS Resume Expert.

            Analyze the following resume.

            ${resume.extractedText}

            Return ONLY valid JSON.

            Format:

            {
            "atsScore": 0,
            "strengths": [],
            "weaknesses": [],
            "suggestions": []
            }

        `;

        // Creatig a retry logic if ai itegratio fails
        const generateWithRetry = async (
            prompt,
            retries = 3
        ) => {

            for (
                let i = 0;
                i < retries;
                i++
            ) {

                try {

                    const result =
                        await model.generateContent(
                            prompt
                        );

                    return result;

                } catch (error) {

                    if (
                        error.message.includes(
                            "503"
                        ) &&
                        i < retries - 1
                    ) {

                        console.log(
                            `Retry ${i + 1}`
                        );

                        await new Promise(
                            resolve =>
                                setTimeout(
                                    resolve,
                                    3000
                                )
                        );

                    } else {

                        throw error;

                    }

                }

            }

        };

        // Contains the result returned by SDK
        const result =
            await generateWithRetry(
                prompt
            );

        // Extracts the AI-generated text
        const rawResponse =
            result.response.text();

        let analysis;

        try {

            analysis = JSON.parse(
                rawResponse
            );

        } catch (error) {
            
            return res.status(500).json({
                success: false,
                message: "Failed to parse AI response"
            })
        }

        res.status(200).json({
            success: true,
            analysis
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

    console.log("Analyzing with Gemini...");
};

module.exports = {
    analyzeResume
}