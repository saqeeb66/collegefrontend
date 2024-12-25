import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./taskdetails.css";

const TaskDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { issue } = location.state || { issue: null };

  // Helper function to render media (video/audio)
  const renderMedia = (file, type) => {
    if (!file) return <p>No {type === "video" ? "Video" : "Audio"} Uploaded</p>;

    const fileUrl = file.startsWith("http") ? file : `http://localhost:8080/uploads/${file}`;  // Correct path
    return type === "video" ? (
      <video controls width="100%" style={{ maxWidth: "300px" }}>
        <source src={fileUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <audio controls style={{ maxWidth: "300px" }}>
        <source src={fileUrl} type="audio/wav" />
        Your browser does not support the audio tag.
      </audio>
    );
  };

  return (
    <div className="task-details-container">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        <h3>Task Details</h3>
      </div>

      {issue ? (
        <div className="details-card">
          <h2>Issue Details</h2>
          <p>
            <strong>Task ID:</strong> {issue.id}
          </p>
          <p>
            <strong>Raised By:</strong> {issue.raisedBy}
          </p>
          <p>
            <strong>Raised On:</strong> {new Date(issue.raisedOn).toLocaleString()}
          </p>
          <p>
            <strong>Issue Type:</strong> {issue.issueType}
          </p>
          <p>
            <strong>Issue Description:</strong> {issue.issue}
          </p>
          <div className="media-section">
            <div>
              <strong>Video Recording:</strong>
              {renderMedia(issue.recordingVideo, "video")}
            </div>
            <div>
              <strong>Audio Recording:</strong>
              {renderMedia(issue.recordingAudio, "audio")}
            </div>
          </div>
          <p>
            <strong>Status:</strong> {issue.raisedStatus}
          </p>
        </div>
      ) : (
        <p className="no-details">No details found</p>
      )}
    </div>
  );
};

export default TaskDetailsPage;
