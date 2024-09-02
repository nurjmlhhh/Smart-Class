import "../pages/login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'student', // Role default
    });

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        alert('Logged out successfully!');
        navigate('/login');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (response.ok) {
                const result = await response.json(); // Parsing response as JSON
                alert("Login berhasil");

                // Assuming result.token contains the JWT token
                Cookies.set('token', result.token, { expires: 1 }); // Expires in 1 day
                console.log(Cookies.get("token")); // Log token to console

                // Decode the token
                const decodedToken = jwtDecode(result.token || null);
                console.log("Decoded Token:", decodedToken); // Log decoded token to console

                // Redirect to home page after successful login
                navigate("/");
            } else {
                const errorText = await response.text();
                alert(`Error: ${errorText}`);
            }
        } catch (error) {
            console.error('Terjadi kesalahan!', error);
            alert('Terjadi kesalahan saat login.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="light-effect"></div>
                <div className="login-form">
                    <h2 className="login-title">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {/* <label className="form-label">Username:</label> */}
                            <input 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                                className="form-input" placeholder="Username"
                            />
                        </div>
                        
                        <div className="form-group">
                            {/* <label className="form-label">Password:</label> */}
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                                className="form-input" placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Role:</label>
                            <select 
                                name="role" 
                                value={formData.role} 
                                onChange={handleChange} 
                                required 
                                className="form-select"
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className="submit-button"
                        >
                            Login
                        </button>
                    </form>
                    <div className="register-link">
                        <p>Belum punya akun? <a href="/register">Daftar di sini</a></p>
                    </div>
                </div>
            </div>
            <div className="logout-container">
                <h1 className="welcome-title">Selamat Datang</h1>
                <button
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Login;
