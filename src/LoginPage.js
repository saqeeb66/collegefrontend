import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

// Import images
import logo from "./307584263_620272493135518_8793218597863576803_n.jpg";
import googleIcon from "./google 1.png";
import illustration from "./image 1.png";

const LoginPage = () => {
  const [googleLoginURL, setGoogleLoginURL] = useState("");
  const [role, setRole] = useState("Staff");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const credentials = {
    Staff: { username: "staffuser", password: "staffpassword" },
    Admin: { username: "adminuser", password: "adminpassword" },
    Management: { username: "managementuser", password: "managementpassword" },
  };

  useEffect(() => {
    const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
    const REDIRECT_URI = "YOUR_REDIRECT_URI";
    const scope = "profile email";
    setGoogleLoginURL(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${scope}`
    );
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (
      username === credentials[role].username &&
      password === credentials[role].password
    ) {
      setError("");

      // Redirect based on the role
      if (role === "Admin" || role === "Management") {
        navigate("/raised-issues"); // Admin and Management go to raisedissue1
      } else {
        navigate("/Home"); // Staff goes to Home
      }
    } else {
      setError(`Invalid username or password for ${role}`);
    }
  };

  return (
    <div className="container1">
      <div className="login-card">
        <img src={logo} alt="College Logo" className="logo" />
        <h2>Estb 1980</h2>
        <h1>Welcome to GCE</h1>
        <p className="subtext">Maintenance Department</p>

        <a href={googleLoginURL} className="google-login">
          <img src={googleIcon} alt="Google Icon" />
          Sign in with Google
        </a>

        <form onSubmit={handleLoginSubmit} className="login-form">
          <label htmlFor="role">Login as:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
            <option value="Management">Management</option>
          </select>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <a href="#" className="forgot-password">
            Forgot Password?
          </a>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="illustration">
          <img src={illustration} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
