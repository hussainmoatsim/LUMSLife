import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./pages/student/Hompage.jsx";
import "./App.css";

import { UserContext } from "./UserContext";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar.js";
import VerifyEmail from "./pages/VerifyEmail";
import CreatePost from "./pages/society/CreatePost";
import Profile from "./pages/student/StudentProfile.jsx";
import SocietyProfile from "./pages/society/SocietyProfile";

function App() {
  const [accountID, setAccountID] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [accountName, setAccountName] = useState(null);

  const userContext = {
    accountID,
    setAccountID,
    accountType,
    setAccountType,
    accountName,
    setAccountName,
  };

  return (
    <UserContext.Provider value={userContext}>
      <Router>
        <div className="App">
          {accountID && <Navbar />}
          <Routes>
            <Route path="/" element={accountID ? <Homepage /> : <Login />} />
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route
              exact
              path="/create-post"
              element={accountID ? <CreatePost /> : <Login />}
            ></Route>
            <Route path="/verify-email" element={<VerifyEmail />}></Route>
            <Route path="/profile/*" element={<Profile />}></Route>{" "}
            <Route path="/society-profile" element={<SocietyProfile />} />
            {/* Add the Profile route */}
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
