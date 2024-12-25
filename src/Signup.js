import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./signup.css";
import illustration from "./image 2.png";

const SignupPage = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    navigate("/LoginPage"); // Redirect to the login page
  };

  return (
    <div className="container2">
      <div className="signup-form">
        {/* Back Button */}
        <button className="back-button">&#x2190;</button>

        {/* Welcome Message */}
        <h1>Welcome to GCE</h1>
        <p>Maintenance Department</p>

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          {/* Full Name Input */}
          <input type="text" placeholder="Full Name" required />

          {/* Email Address Input */}
          <input type="email" placeholder="Email Address" required />

          {/* Password Inputs */}
          <input type="password" placeholder="Create Password" required />
          <input type="password" placeholder="Re-enter Password" required />

          {/* Submit Button */}
          <button type="submit">Sign up</button>
        </form>

        {/* Illustration */}
        <div className="illustration">
          <img src={illustration} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
