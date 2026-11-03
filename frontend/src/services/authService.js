import axios from 'axios';

const API_URL = "http://localhost:5000/api/users";


// Login API
export const loginUser = async (userData) => {

    const response = await axios.post(
        `${API_URL}/login`,
        userData
    );

    return response.data;
}


// Get logged-in user
export const getMe =
    async () => {

        const token = localStorage.getItem("token");

        const response =
            await axios.get(
                `${API_URL}/me`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;
    };