import React, { useState, useEffect } from 'react';
import "./MaintenancePage.css"; // You can reuse the same CSS file

const ElectricalPage = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    // Fetch the data for Electrical issues when this page is mounted
    fetch('http://localhost:8080/maintenance/getByIssueType/electrical')
      .then((response) => response.json())
      .then((data) => {
        setMaintenanceData(data); // Store the fetched data in state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const renderMedia = (mediaData, mediaType) => {
    if (!mediaData) return null;

    switch (mediaType) {
      case 'image/jpeg':
      case 'image/png':
        return <img src={`data:${mediaType};base64,${mediaData}`} alt="Uploaded Media" className="media" />;
      case 'audio/mpeg':
      case 'audio/wav':
        return (
          <audio controls className="media">
            <source src={`data:${mediaType};base64,${mediaData}`} type={mediaType} />
            Your browser does not support the audio element.
          </audio>
        );
      case 'video/mp4':
        return (
          <video controls className="media">
            <source src={`data:${mediaType};base64,${mediaData}`} type={mediaType} />
            Your browser does not support the video element.
          </video>
        );
      default:
        return <p>Unsupported media type</p>;
    }
  };

  return (
    <div className="page-container">
      <h2>Electrical Issues</h2>
      {maintenanceData.length === 0 ? (
        <p className="no-data">No maintenance records available for Electrical.</p>
      ) : (
        <ul className="maintenance-list">
          {maintenanceData.map((maintenance) => (
            <li key={maintenance.maintenanceId} className="maintenance-item">
              <h3>{maintenance.issueType}</h3>
              <p><strong>Issue Description:</strong> {maintenance.issue}</p>
              <p><strong>Reported by:</strong> {maintenance.name}</p>
              <p><strong>Email:</strong> {maintenance.email}</p>

              {/* Render Media based on MIME type */}
              {maintenance.fileData && renderMedia(maintenance.fileData, maintenance.fileType)}

              {/* Render Recording Media based on MIME type */}
              {maintenance.recordingData && renderMedia(maintenance.recordingData, maintenance.recordingType)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ElectricalPage;
