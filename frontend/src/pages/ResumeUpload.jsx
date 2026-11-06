import { useState } from "react";
import { uploadResume } from "../services/resumeService";

function ResumeUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {
        alert("Select a file");
        return;
      }

    if (
        file.size >
        5 * 1024 * 1024
      ) {
        alert(
            "Maximum 5MB allowed"
        );
        return;
      }


    try {
      const data = await uploadResume(file);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-4">
      <h1 className="text-4xl font-medium mt-12">Upload Resume</h1>

      <label
        htmlFor="file"
        className="flex flex-col items-center justify-center 
        w-9/12 h-16 py-10 border-2 border-dashed 
        border-gray-300 rounded-xl cursor-pointer 
        bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-gray-700">
            Upload your file
          </p>

          <p className="text-sm text-gray-500 mt-2">Click to browse files</p>
        </div>

        <input
          id="file"
          type="file"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files[0])
          }}
          accept="image/*,.pdf"
        />
      </label>

      {file && (
        <p className="mt-3 text-sm text-green-600">Selected: {file.name}</p>
      )}

      <button 
        className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg mt-5 hover:bg-blue-700"
        onClick={handleUpload}
      >
        Upload Resume
      </button>
    </div>
  );
}

export default ResumeUpload;
