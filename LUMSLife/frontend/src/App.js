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

  // this useEffect is not working desireably, so need to be fixes

  // useEffect(() => {
  //   const savedState = JSON.parse(localStorage.getItem("userContext"));
  //   console.log(savedState);
  //   if (savedState) {
  //     userContext.setAccountID(savedState.accountID);
  //     userContext.setAccountType(savedState.accountType);
  //     userContext.setAccountName(savedState.accountName);
  //   } else {
  //     localStorage.setItem("userContext", JSON.stringify(userContext));
  //   }
  // }, []);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={userContext}>
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
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
