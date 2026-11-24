const Resume = require("../models/Resume");
const model = require("../services/geminiService");

const matchResumeWithJD = async (req, res) => {

    try {

        const { jobDescription } =
            req.body;

        const resume =
            await Resume.findById(
                req.params.id
            )

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const prompt = `
            You are an ATS Expert.

            Compare the following Resume and Job Description.

            Resume:

            ${resume.extractedText}

            Job Description:

            ${jobDescription}

            Return ONLY valid JSON.

            {
            "matchScore": 0,
            "matchingSkills": [],
            "missingSkills": [],
            "recommendations": []
            }
        `;

        // Creatig a retry logic if ai itegration fails
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

        const result =
            await generateWithRetry(
                prompt
            );

        const rawResponse = result.response.text();

        const analysis =
            JSON.parse(rawResponse);

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
};

module.exports = {
    matchResumeWithJD
};

