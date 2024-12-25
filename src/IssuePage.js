import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './issuepage.css';

const InputField = ({ label, name, value, onChange, type = "text", placeholder = "" }) => {
  return (
    <div className="input-field">
      <label>
        <strong>{label}:</strong>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

const IssuePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioURL, setAudioURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null); 
  const [audioData, setAudioData] = useState(null);  
  const [videoData, setVideoData] = useState(null);  
  const [formData, setFormData] = useState({
    issue: "",
    taskDone: false,
    raisedStatus: "",
    raisedBy: "",
    raisedOn: "",
    issueType: "",
  });

  const audioPlayerRef = useRef(null);
  const videoPlayerRef = useRef(null); 
  const mediaRecorder = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { type, issues } = location.state || {};  

  // Handle audio recording
  const handleAudioRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (event) => {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        };

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
          setAudioData(audioBlob);  
          setAudioChunks([]); 
        };

        mediaRecorder.current.start();
        setIsRecording(true);
      } catch (error) {
        alert("Audio recording is not supported or permission denied.");
      }
    } else {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  // Handle video file upload
  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const fileURL = URL.createObjectURL(file);
      setVideoURL(fileURL);  
      setVideoData(file);  
    } else {
      alert("Please upload a valid video file.");
    }
  };

  useEffect(() => {
    const currentDateTime = new Date().toISOString(); 
    setFormData((prevData) => ({
      ...prevData,
      raisedOn: currentDateTime,
    }));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Final submit handler
  const handleFinalSubmit = async () => {
    if (!formData.issue || !formData.raisedBy || !formData.raisedStatus || !formData.issueType) {
      alert("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("issue", formData.issue);
    formDataToSend.append("raisedBy", formData.raisedBy);
    formDataToSend.append("taskDone", formData.taskDone);
    formDataToSend.append("raisedOn", formData.raisedOn);
    formDataToSend.append("raisedStatus", formData.raisedStatus);
    formDataToSend.append("issueType", formData.issueType);
    formDataToSend.append("issueList", issues);

    // Append audio data if available
    if (audioData) {
      formDataToSend.append("recordingAudio", audioData, "audio.wav");
    }

    // Append video data if available
    if (videoData) {
      formDataToSend.append("recordingVideo", videoData, "video.mp4");
    }

    try {
      const response = await fetch('https://7f79-101-0-62-12.ngrok-free.app/tasks', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const responseData = await response.json();
        navigate('/raised-issue', { state: responseData });  
      } else {
        alert('Error submitting the issue. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
      alert('An error occurred while submitting the issue.');
    }
  };

  return (
    <div className="submission-task">
      <div className="header1">
        <button className="back-btn" onClick={() => navigate(-1)}>&lt;</button>
        <h4>Submission Task</h4>
      </div>
      <div className="task-box">
        <div className="issue-section">
          <h5>{type} Issue</h5>
        </div>

        <textarea
          name="issue"
          placeholder="Issue Description"
          value={formData.issue}
          onChange={handleInputChange}
        ></textarea>

        <InputField
          label="Raised By"
          name="raisedBy"
          value={formData.raisedBy}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />

        <div className="raised-Status">
          <label>
            <strong>Raised Status:</strong>
            <select
              name="raisedStatus"
              value={formData.raisedStatus}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Assigned">Assigned</option>
            </select>
          </label>
        </div>

        <div className="raised-on">
          <label>
            <strong>Raised On:</strong>
            <input
              type="text"
              name="raisedOn"
              value={formData.raisedOn}
              disabled
            />
          </label>
        </div>

        <InputField
          label="Issue Type"
          name="issueType"
          value={formData.issueType}
          onChange={handleInputChange}
          placeholder="Enter the type of issue"
        />

        <div className="actions">
          <label className="attach-file">
            <input type="file" onChange={handleVideoFileChange} />
            📎 Attach Video
          </label>

          <button
            id="record-btn"
            className="voice-btn"
            onClick={handleAudioRecording}
          >
            {isRecording ? "⏹ Stop Recording" : "🎤 Start Audio Recording"}
          </button>
        </div>

        <button className="submit-btn" onClick={handleFinalSubmit}>
          Submit
        </button>

        {audioURL && (
          <div id="audio-preview" className="audio-preview">
            <p>Recorded Audio:</p>
            <audio controls ref={audioPlayerRef} src={audioURL}></audio>
          </div>
        )}

        {videoURL && (
          <div id="video-preview" className="video-preview">
            <p>Uploaded Video:</p>
            <video controls ref={videoPlayerRef} src={videoURL} width="300"></video>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuePage;
