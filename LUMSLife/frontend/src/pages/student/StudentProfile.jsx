import React from "react";
import { Route, Link, Routes, Outlet } from "react-router-dom";
import ProfileEdit from "./ProfileEdit.jsx";
import CVAboutMe from "./CVAboutMe.jsx";
import MySocieties from "./MySocieties.jsx";
import MyApplications from "./MyApplications.jsx";
import "../CSS/StudentProfile.css";

const StudentProfile = () => {
  return (
    <div className="student-profile">
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>About Me</h1>
                {/* Include About Me content here once db updated*/}
                <h1>My Societies</h1>
                {/* Include My Societies content table here once db updated*/}
              </div>
            }
          />
          <Route path="/edit" element={<ProfileEdit />} />
          <Route path="/cv-about-me" element={<CVAboutMe />} />
          <Route path="/my-societies" element={<MySocieties />} />
          <Route path="/my-applications" element={<MyApplications />} />
        </Routes>
        <Outlet />
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
    </div>
  );
};

export default StudentProfile;
