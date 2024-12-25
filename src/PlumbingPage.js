import React, { useState, useEffect } from 'react';
import "./PlumbingPage.css"

const PlumbingPage = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  
  useEffect(() => {
    // Fetch the data for Plumbing issues when this page is mounted
    fetch('http://localhost:8080/maintenance/getByIssueType/Plumbing')
      .then((response) => response.json())
      .then((data) => {
        setMaintenanceData(data); // Store the fetched data in state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const renderMedia = (mediaData, mediaType) => {
    // Check mediaType and render the appropriate HTML tag
    if (!mediaData) return null;

    switch (mediaType) {
      case 'image/jpeg':
      case 'image/png':
        // For image files
        return <img src={`data:${mediaType};base64,${mediaData}`} alt="Uploaded Media" style={{ width: '100%', maxWidth: '600px' }} />;
      case 'audio/mpeg':
      case 'audio/wav':
        // For audio files
        return (
          <audio controls>
            <source src={`data:${mediaType};base64,${mediaData}`} type={mediaType} />
            Your browser does not support the audio element.
          </audio>
        );
      case 'video/mp4':
        // For video files
        return (
          <video controls style={{ width: '100%', maxWidth: '600px' }}>
            <source src={`data:${mediaType};base64,${mediaData}`} type={mediaType} />
            Your browser does not support the video element.
          </video>
        );
      default:
        return <p>Unsupported media type</p>;
    }
  };

  return (
    <div>
      <h2>Plumbing Issues</h2>
      {maintenanceData.length === 0 ? (
        <p className="no-data">No maintenance records available for Plumbing.</p>
      ) : (
        <ul>
          {maintenanceData.map((maintenance) => (
            <li key={maintenance.maintenanceId}>
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

export default PlumbingPage;
