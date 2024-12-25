import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./raisedissue.css";

const RaisedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [activeStatus, setActiveStatus] = useState("Pending");
  const [deletionMessage, setDeletionMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch issues from the API
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("http://localhost:8080/tasks");
        if (response.ok) {
          const data = await response.json();
          setIssues(data);
        } else {
          setError("Failed to fetch issues");
        }
      } catch (error) {
        setError("Error fetching issues");
        console.error("Error fetching issues:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // Handle delete operation with confirmation
  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setIssues(issues.filter((issue) => issue.taskId !== taskId));
          setDeletionMessage("Task deleted successfully!");
          setTimeout(() => setDeletionMessage(""), 3000);
        } else {
          setError("Failed to delete task");
        }
      } catch (error) {
        setError("Error deleting task");
        console.error("Error deleting task:", error);
      }
    }
  };

  // Filter issues based on active status
  const filteredIssues = issues.filter((issue) => issue.raisedStatus === activeStatus);

  return (
    <div className="raised-issue">
      <div className="header1">
        <button className="button3 back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h3>Raised Issues</h3>
      </div>

      {deletionMessage && <div className="success-message">{deletionMessage}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="tabs-container1">
        {["Pending", "Completed", "Assigned"].map((status) => (
          <button
            key={status}
            className={`button3 ${activeStatus === status ? "active-tab" : ""}`}
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="table-container1">
        {isLoading ? (
          <p>Loading issues...</p>
        ) : (
          <table className="issue-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Raised By</th>
                <th>Raised On</th>
                <th>Issue Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <tr key={issue.taskId}>
                    <td>{issue.taskId}</td>
                    <td>{issue.raisedBy}</td>
                    <td>{new Date(issue.raisedOn).toLocaleString()}</td>
                    <td>{issue.issueType}</td>
                    
                    <td>
                      <button
                        className="button3"
                        onClick={() => navigate("/task-details", { state: { issue } })}
                      >
                        Open
                      </button>
                      <button
                        className="button3 delete-btn"
                        onClick={() => handleDelete(issue.taskId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No issues found for {activeStatus}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RaisedIssues;
