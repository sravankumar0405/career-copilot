import { useState } from "react";
import { useParams } from "react-router-dom";
import { matchResume } from "../services/matchJobService";

function JobMatch() {
    const { id } = useParams();

    const [jobDescription, setJobDescription] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            alert("Please paste a Job Description");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await matchResume(id, jobDescription);

            console.log("Job Match Response", data);

            setAnalysis(data.analysis);

        } catch (error) {

            setError(error?.response?.data?.message || "Analysis Failed");

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen  bg-slate-100 py-10 px-4">

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Resume Job Match Analysis
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Compare your resume with a target job description
                    </p>

                </div>

                {/* JOB DESCRIPTION INPUT */}

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-xl font-semibold mb-4">Paste Job Description</h2>

                    <textarea
                        id="jobDescription"
                        rows={10}
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the complete job description here..."
                        className="w-full rounded-lg border border-gray-300 p-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-400"
                    />

                    <button
                        className="mt-6 rounded-lg py-3 px-6 bg-blue-500 hover:bg-blue-700 font-medium text-white cursor-pointer"
                        onClick={handleAnalyze}
                    >
                        {loading ? "Analyzing..." : "Analyzing Match"}
                    </button>

                </div>

                {/* ERROR */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-6">
                        {error}
                    </div>
                )}

                {/* RESULTS */}

                {analysis && (
                    <div className="mt-8">
                        {/* SCORE CARD */}

                        <div className="bg-white rounded-xl  shadow-md p-8 mb-6">
                            <h2 className="text-xl font-semibold text-gray-700">
                                Match Score
                            </h2>

                            <div className="mt-4">
                                <span
                                    className={`text-6xl font-bold ${analysis.matchScore >= 80
                                            ? "text-green-600"
                                            : analysis.matchScore >= 60
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                        }`}
                                >
                                    {analysis.matchScore}
                                </span>

                                <span className="text-2xl text-gray-500">/100</span>
                            </div>
                        </div>

                        {/* SKILLS SECTION */}

                        <div className="grid md:grid-cols-2 gap-6">

                            {/* MATCHING SKILLS */}

                            <div className="bg-white rounded-xl shadow-md p-6">

                                <h2 className="text-xl font-semibold text-green-600 mb-4">
                                    ✅ Matching Skills
                                </h2>

                                <ul className="space-y-3">
                                    {analysis.matchingSkills.map((skill, index) => (
                                        <li
                                            key={index}
                                            className="bg-green-50 px-4 py-2 rounded-md"
                                        >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>

                            </div>

                            {/* MISSING SKILL */}

                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-semibold text-green-600 mb-4">
                                    ❌ Missing Skills
                                </h2>

                                <ul className="space-y-3">
                                    {analysis.missingSkills.map((skill, index) => (
                                        <li key={index} className="bg-red-50 px-4 py-2 rounded-md">
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* RECOMMENDATIONS */}

                        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                💡 Recommendations
                            </h2>

                            <ul className="space-y-3">
                                {analysis.recommendations.map((item, index) => (
                                    <li key={index} className="bg-blue-50 px-4 py-3 rounded-md">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobMatch;
