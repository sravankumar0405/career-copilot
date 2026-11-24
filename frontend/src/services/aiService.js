import axios from "axios";

export const analyzeResume = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(

        `http://localhost:5000/api/ai/analyze/${id}`,
        {
            headers: {
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    return response.data;
}