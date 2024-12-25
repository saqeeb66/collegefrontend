import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './raisedissue.css';

const RaisedIssuePage = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("https://7f79-101-0-62-12.ngrok-free.app/tasks");
        if (response.ok) {
          const data = await response.json();
          setIssues(data);
        } else {
          console.error("Failed to fetch issues: ", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  // Helper function to render media (video/audio)
  const renderMedia = (file, type) => {
    if (!file) return <p>No {type === "video" ? "Video" : "Audio"} Uploaded</p>;

    const fileUrl = file.startsWith("http") ? file : `https://7f79-101-0-62-12.ngrok-free.app/uploads/${file}`;
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
    <div className="raised-issue">
      <div className="header1">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h3>Raised Issues</h3>
      </div>

      <div className="table-container1">
        <table className="issue-table">
          <thead>
            <tr>
              <th>Raised By</th>
              <th>Raised On</th>
              <th>Issue Type</th>
              <th>Issue Description</th>
              <th>Video Recording</th>
              <th>Audio Recording</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.raisedBy}</td>
                <td>{new Date(issue.raisedOn).toLocaleString()}</td>
                <td>{issue.issueType}</td>
                <td>{issue.issue}</td>
                <td>{renderMedia(issue.recordingVideo, "video")}</td>
                <td>{renderMedia(issue.recordingAudio, "audio")}</td>
                <td>{issue.raisedStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RaisedIssuePage;
