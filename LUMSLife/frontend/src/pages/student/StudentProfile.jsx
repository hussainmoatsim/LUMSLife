import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ProfileEdit from "./ProfileEdit.jsx";
import CVAboutMe from "./CVAboutMe.jsx";
import MySocieties from "./MySocieties.jsx";
import MyApplications from "./MyApplications.jsx";
import "../CSS/StudentProfile.css";

const StudentProfile = () => {
  return (
    <Router>
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
        <Switch>
          <Route path="/profile/edit" component={ProfileEdit} />
          <Route path="/profile/cv-about-me" component={CVAboutMe} />
          <Route path="/profile/my-societies" component={MySocieties} />
          <Route path="/profile/my-applications" component={MyApplications} />
        </Switch>
      </div>
    </Router>
  );
};

export default StudentProfile;
