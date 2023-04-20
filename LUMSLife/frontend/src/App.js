import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Homepage from "./pages/Homepage/Hompage";
import EventPage from "./pages/Homepage/SinglePost.jsx";

import { UserContext } from "./UserContext";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar.js";
import VerifyEmail from "./pages/VerifyEmail";
import CreatePost from "./pages/society/CreatePost";
import PostDetails from "./pages/Homepage/PostDetails";
import StudentProfile from "./pages/student/StudentProfile"; // Import StudentProfile component
import { getHomeFeed } from "../src/API/api";

function App() {
  const [accountID, setAccountID] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [homeFeed, setHomeFeed] = useState(null);

  const userContext = {
    accountID,
    setAccountID,
    accountType,
    setAccountType,
    accountName,
    setAccountName,
    homeFeed,
  };

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getHomeFeed();
      console.log(posts.data);
      setHomeFeed(posts.data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={userContext}>
          {console.log(homeFeed)}
          {accountID && <Navbar />}
          <Routes>
            <Route path="/" element={accountID ? <Homepage /> : <Login />} />
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route
              exact
              path="/create-post"
              element={accountID ? <CreatePost /> : <Login />}
            ></Route>
            <Route
              exact
              path="/event"
              element={accountID ? <EventPage /> : <Login />}
            ></Route>
            <Route path="/verify-email" element={<VerifyEmail />}></Route>
            <Route path="/posts/:id" element={<PostDetails />}></Route>
            <Route
              path="/profile"
              element={
                accountID ? <StudentProfile userId={accountID} /> : <Login />
              } // Add StudentProfile component
            ></Route>
            <Route
              path="/profile/*"
              element={
                accountID ? <StudentProfile userId={accountID} /> : <Login />
              }
            />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
