import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import ProfileEdit from "./ProfileEdit.jsx";
import CVAboutMe from "./CVAboutMe.jsx";
import MySocieties from "./MySocieties.jsx";
import MyApplications from "./MyApplications.jsx";
import "../../CSS/StudentProfile.css";

const StudentProfile = ({ userId }) => {
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
          <Route path="edit" element={<ProfileEdit userId={userId} />} />
          <Route path="cv-about-me" element={<CVAboutMe userId={userId} />} />
          <Route
            path="my-societies"
            element={<MySocieties userId={userId} />}
          />
          <Route
            path="my-applications"
            element={<MyApplications userId={userId} />}
          />
        </Routes>
      </div>
      <div className="side-menu">
        <nav>
          <ul>
            <li>
              <Link to="edit">Edit Information</Link>
            </li>
            <li>
              <Link to="cv-about-me">Add CV/About Me</Link>
            </li>
            <li>
              <Link to="my-societies">View My Societies</Link>
            </li>
            <li>
              <Link to="my-applications">View Applications</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default StudentProfile;
