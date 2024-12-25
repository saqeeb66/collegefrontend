import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import IssuePage from './IssuePage';
import Signup from './Signup';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import PlumbingPage from "./PlumbingPage";
import ElectricalPage from "./ElectricalPage";
import InteriorPage from "./InteriorPage";
import OtherPage from "./OtherPage";
import RaisedIssuePage from './RaisedIssuePage';
import RaisedIssues from './RaisedIssues';
import TaskDetailsPage from "./TaskDetailsPage";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/IssuePage" element={<IssuePage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/plumbingPage" element={<PlumbingPage />} />
        <Route path="/ElectricalPage" element={<ElectricalPage />} />
        <Route path="/InteriorPage" element={<InteriorPage />} />
        <Route path="/OtherPage" element={<OtherPage />} />
        <Route path="/raised-issue" element={<RaisedIssuePage />} />
        <Route path="/raised-issues" element={<RaisedIssues />} />
        <Route path="/task-details" element={<TaskDetailsPage />} />


        
        {/* Fallback route to handle undefined routes */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
