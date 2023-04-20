import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import EditAbout from "./EditAbout";
import ViewSocietyPosts from "./ViewSocietyPosts";
import ViewSocietyMembers from "./ViewSocietyMembers";
import ConductInductions from "./ConductInductions";
import UserContext from "./UserContext";
import "../CSS/SocietyProfile.css";

const SocietyProfile = () => {
  const { accountID } = useContext(UserContext);

  return (
    <Router>
      <div className="society-profile">
        <h1>Society Profile</h1>
        <div className="sidebar">{/* Sidebar content */}</div>
        <div className="main-content">
          <Routes>
            <Route
              path="/society-profile/edit-profile"
              element={<EditProfile societyID={accountID} />}
            />
            <Route
              path="/society-profile/edit-about"
              element={<EditAbout societyID={accountID} />}
            />
            <Route
              path="/society-profile/view-society-posts"
              element={<ViewSocietyPosts societyID={accountID} />}
            />
            <Route
              path="/society-profile/view-society-members"
              element={<ViewSocietyMembers societyID={accountID} />}
            />
            <Route
              path="/society-profile/conduct-inductions"
              element={<ConductInductions societyID={accountID} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default SocietyProfile;
