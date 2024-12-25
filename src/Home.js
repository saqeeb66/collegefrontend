import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

// Import the images
import plumbingImg from "./plumbing.png";
import electricalImg from "./electrical.png";
import interiorImg from "./interior.png";
import otherImg from "./other.png";
import RenovationsImg from "./Renovations.png";  // Add an image for Innovations
import constructionsImg from "./Constructions.png"; // Add an image for Constructions

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock sections with corresponding images, query counts, and navigation paths
  const sections = [
    {
      name: "Plumbing",
      issues: ["Leaky faucet", "Clogged pipe"],
      image: plumbingImg,
      queries: 5,
      route: "/issuePage", // Shared issue page route
      type: "Plumbing", // Pass type to identify the section
    },
    {
      name: "Electrical",
      issues: ["Power outage", "Flickering light"],
      image: electricalImg,
      queries: 3,
      route: "/issuePage",
      type: "Electrical",
    },
    {
      name: "Interior",
      issues: ["Cracked wall", "Peeling paint"],
      image: interiorImg,
      queries: 8,
      route: "/issuePage",
      type: "Interior",
    },
    
    {
      name: "renovations", // New section
      issues: ["New product development", "Research for improvements"],
      image: RenovationsImg,  // Add corresponding image
      queries: 4,
      route: "/issuePage",
      type: "Renovations", // Pass type for the new section
    },
    {
      name: "Constructions", // New section
      issues: ["Building foundations", "Site planning"],
      image: constructionsImg,  // Add corresponding image
      queries: 6,
      route: "/issuePage",
      type: "Constructions", // Pass type for the new section
    },
    {
      name: "Other",
      issues: ["Broken window", "General cleaning"],
      image: otherImg,
      queries: 2,
      route: "/issuePage",
      type: "Other",
    },
  ];

  // Handle section click and navigate with state
  const handleSectionClick = (section) => {
    navigate(section.route, { state: { type: section.type, issues: section.issues } });
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dropdown">
          <button className="dropdown-button">☰</button>
          <div className="dropdown-menu">
            <a href="#">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Logout</a>
          </div>
        </div>
      </header>

      {/* Sections */}
      <div className="sections">
        {sections.map((section, index) => (
          <div
            className="section-card"
            key={index}
            style={{
              backgroundImage: `url(${section.image})`,
            }}
            onClick={() => handleSectionClick(section)} // Redirect on click
          >
            {/* Display query count as a badge */}
            {section.queries > 0 && (
              <div className="query-badge">{section.queries}</div>
            )}
            <h2>{section.name}</h2>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <button>🏠 Home</button>
        <button>👤 Profile</button>
      </footer>
    </div>
  );
};

export default Dashboard;
