import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import ProfileEdit from "./ProfileEdit.jsx";
import CVAboutMe from "./CVAboutMe.jsx";
import MySocieties from "./MySocieties.jsx";
import MyApplications from "./MyApplications.jsx";
import "../CSS/StudentProfile.css";

const StudentProfile = () => {
  return (
    <div className="student-profile">
      <div className="main-content">
        <h1>About Me</h1>
        {/* Include About Me content here once db updated*/}
        <h1>My Societies</h1>
        {/* Include My Societies content table here once db updated*/}
      </div>
      <div className="side-menu">
        <nav>
          <ul>
            <li>
              <Link to="/profile/edit">Edit Information</Link>
            </li>
            <li>
              <Link to="/profile/cv-about-me">Add CV/About Me</Link>
            </li>
            <li>
              <Link to="/profile/my-societies">View My Societies</Link>
            </li>
            <li>
              <Link to="/profile/my-applications">View Applications</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/cv-about-me" element={<CVAboutMe />} />
        <Route path="/profile/my-societies" element={<MySocieties />} />
        <Route path="/profile/my-applications" element={<MyApplications />} />
      </Routes>
    </div>
  );
};

export default StudentProfile;
