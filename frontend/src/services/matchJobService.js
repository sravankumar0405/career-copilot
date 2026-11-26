import axios from "axios";

const API_URL =
"http://localhost:5000/api/job-match";

export const matchResume =
  async (id, jobDescription) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${API_URL}/${id}`,
        {
          jobDescription,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};