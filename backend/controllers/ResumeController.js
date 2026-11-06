const Resume =
    require("../models/Resume");

const getMyResumes =
    async (req, res) => {

        try {

            const resumes =
                await Resume.find({
                    user: req.user.id
                });

            res.json({
                success: true,
                resumes
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

const deleteResume = async (req, res) => {

    try {
        const resume = await Resume.findById(req.params.id);

        if(!resume) {
            return res.status(404).json({
                message: "Resume not Found"
            });
        }

        if(resume.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            })
        }

        await Resume.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message: "Resume Deleted"
        });

    } catch(error) {

        res.status(500).json({
            success:false,
            message: error.message
        });
    }
};

module.exports = {
    getMyResumes,
    deleteResume
}