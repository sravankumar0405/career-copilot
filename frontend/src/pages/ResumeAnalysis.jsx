import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { analyzeResume } from "../services/aiService";

function ResumeAnalysis() {
    const { id } = useParams();

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAnalysis();
    }, []);

    const fetchAnalysis = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await analyzeResume(id);

            setAnalysis(data.analysis);
        } catch (error) {
            setError(error?.response?.data?.message || "Failed to analyze resume");
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700">
                        🤖 AI is analyzing your resume...
                    </h2>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-red-600 text-xl font-bold">Error</h2>

                    <p className="mt-2 text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">No Analysis Available</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 py-10 px-4">

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        AI Resume Analysis
                    </h1>

                    <p className="text-gray-600 mt-2">
                        ATS score and personalized recommendations
                    </p>
                </div>

                {/* ATS SCORE CARD */}

                <div className="bg-white rounded-xl shadow-md p-8 mb-8">

                    <h2 className="text-xl font-semibold text-gray-700">
                        ATS Score
                    </h2>

                    <div className="mt-4">

                        <span
                            className={`
              text-6xl font-bold
              ${analysis.atsScore >= 80
                                    ? "text-green-600"
                                    : analysis.atsScore >= 60
                                        ? "text-yellow-500"
                                        : "text-red-500"
                                }
            `}
                        >
                            {analysis.atsScore}
                        </span>

                        <span className="text-2xl text-gray-500">
                            /100
                        </span>

                    </div>

                </div>

                {/* GRID */}

                <div className="grid md:grid-cols-2 gap-6">

                    {/* STRENGTHS */}

                    <div className="bg-white rounded-xl shadow-md p-6">

                        <h2 className="text-2xl font-semibold text-green-600 mb-4">
                            ✅ Strengths
                        </h2>

                        <ul className="space-y-2">

                            {analysis.strengths.map(
                                (strength, index) => (

                                    <li
                                        key={index}
                                        className="bg-green-50 px-4 py-2 rounded-md"
                                    >
                                        {strength}
                                    </li>

                                )
                            )}

                        </ul>

                    </div>

                    {/* WEAKNESSES */}

                    <div className="bg-white rounded-xl shadow-md p-6">

                        <h2 className="text-2xl font-semibold text-red-600 mb-4">
                            ❌ Weaknesses
                        </h2>

                        <ul className="space-y-2">

                            {analysis.weaknesses.map(
                                (weakness, index) => (

                                    <li
                                        key={index}
                                        className="bg-red-50 px-4 py-2 rounded-md"
                                    >
                                        {weakness}
                                    </li>

                                )
                            )}

                        </ul>

                    </div>

                </div>

                {/* SUGGESTIONS */}

                <div className="bg-white rounded-xl shadow-md p-6 mt-6">

                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                        💡 Improvement Suggestions
                    </h2>

                    <ul className="space-y-3">

                        {analysis.suggestions.map(
                            (suggestion, index) => (

                                <li
                                    key={index}
                                    className="bg-blue-50 px-4 py-3 rounded-md"
                                >
                                    {suggestion}
                                </li>

                            )
                        )}

                    </ul>

                </div>

            </div>

        </div>
    );
}

export default ResumeAnalysis;

