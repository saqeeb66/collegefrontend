import React from "react";
import "./welcome.css";
import { Link } from 'react-router-dom';
import logo from './307584263_620272493135518_8793218597863576803_n.jpg';
import logo1 from './image 3.png'; // Replace with your specific image path

function WelcomePage() {
  return (
    <div className="container">
      <div className="header3">
        <img src={logo} alt="GCE Logo" className="logo" />
      </div>
      <div className="header3">
        <h2>Estb-1980</h2>
      </div>
      <div className="header3">
        <h1>Welcome to GCE</h1>
      </div>
      <div className="header3">
        <p>Maintenance Department</p>
      </div>
      <div className="buttons">
        <Link to="/LoginPage" className="btn">
          Login
        </Link>
        <Link to="/Signup" className="btn">
          Signup
        </Link>
      </div>
      <div className="image">
        <img src={logo1} alt="GCE Logo" className="logo" />
      </div>
    </div>
  );
}

export default WelcomePage;
