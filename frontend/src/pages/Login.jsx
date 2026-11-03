import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log(
            email,
            password
        );
        
        try {

            const data = await loginUser({
                email,
                password
            });

            console.log(data);

            // Store JWT token after successful login
            login(data.token)
            
            // Navigate to dashboard here if required
            navigate('/dashboard');
        } catch(error) {
            console.log(
                error.response?.data?.message || error.message
            );
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                className="flex flex-col gap-4 items-center justify-center bg-white p-8 rounded-lg shadow-md w-96"
                onSubmit={handleSubmit}
            >
            <h1 className="text-3xl font-bold mb-4 text-blue-600">
                Login
            </h1>

            <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e)=> {
                    setEmail(e.target.value)
                }}
                required
                className="border rounded-md px-2 py-2"
            />

            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=> {
                    setPassword(e.target.value)
                }}
                required
                className="border rounded-md px-2 py-2"

            />

            <button 
                className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg mt-5 hover:bg-blue-700"
                type="submit"
            >
                Login
            </button>
        </form>
        </div>
    );
}

export default Login;