import { useEffect, useState } from "react";
import { deleteResume, getMyResumes } from "../services/resumeService";
import { Link } from "react-router-dom";

function MyResumes() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const data = await getMyResumes();

      setResumes(data.resumes);
    };

    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    await deleteResume(id);

    setResumes(resumes.filter((resume) => resume._id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 justify-center items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-semibold text-black-700">MY RESUMES</h1>

      {resumes.map((resume) => (
        <div className="max-w-6xl mx-auto rounded-lg bg-white p-8" key={resume._id}>
          <h3 className="uppercase text-md my-3">{resume.fileName}</h3>

          <div className="flex gap-4">
            <button className="cursor-pointer bg-blue-600 text-white px-4 py-1 rounded-md mt-5 hover:bg-blue-700">
              <a
                href={`http://localhost:5000/${resume.filePath}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
            </button>

            <button className="cursor-pointer bg-blue-600 text-white px-4 py-1 rounded-md mt-5 hover:bg-blue-700">
              <Link
                to={`/resume-analysis/${resume._id}`}
              >
                Analyze Resume
              </Link>
            </button>

            <button className="cursor-pointer bg-blue-600 text-white px-4 py-1 rounded-md mt-5 hover:bg-blue-700">
              <Link
                // to={`/resume-analysis/${resume._id}`}
                to={`/jobMatch/${resume._id}`}
              >
                Analyzing Match
              </Link>
            </button>

            <button
              className="cursor-pointer bg-blue-600 text-white px-4 py-1 rounded-md mt-5 hover:bg-blue-700 "
              onClick={() => handleDelete(resume._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyResumes;
