import { useState } from "react";
import "../pages/login.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student", // Role default
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan!", error);
      alert("Terjadi kesalahan saat registrasi.");
    }
  };

  return (
    <div className="register-container regis">
      <div className="register-form-container">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            {/* <label htmlFor="username" className="form-label">
              Username:
            </label> */}
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input" placeholder="Username"
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="email" className="form-label">
              Email:
            </label> */}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input" placeholder="Email"
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="password" className="form-label">
              Password:
            </label> */}
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input" placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role:
            </label>
            <select
              id="role"
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
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
