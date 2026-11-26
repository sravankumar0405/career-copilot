import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getResumeById } from "../services/resumeService";


function ResumeDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getResumeById(id);

        setResume(data.resume);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResume();
  }, [id]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 ">
      {!resume ? (
        <p>Loading resume...</p>
      ) : (
        <div className=" w-full min-w-10/12">
          <h1 className="text-3xl">{resume.fileName}</h1>

          <hr />

          <h2 className="text-2xl">Extracted Resume Content</h2>

          <pre className="whitespace-pre-wrap">{resume.extractedText}</pre>

          <Link
            to={`/job-match/${resume._id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Job Match Analysis
          </Link>
        </div>
      )}
    </div>
  );
}

export default ResumeDetails;
