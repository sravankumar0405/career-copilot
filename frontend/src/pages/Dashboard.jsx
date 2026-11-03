import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/authService";
import { AuthContext } from "../context/AuthContext";


function Dashboard() {
    const navigate = useNavigate();

    const { logout } = useContext(AuthContext)

    const [user, setUser] = useState(null);

    const handleLogout = () => {
        logout()
        navigate("/");
    }

    useEffect(() => {
        const fetchUser = async ()=> {
            
            const data = await getMe();
            setUser(data.user);
        };

        fetchUser();

    }, [logout, navigate]);

    return(
        <div>
            <h1 className="text-3xl">
                Welcome, {user?.name}
            </h1>
            <p>You have successfully logged in.</p>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;