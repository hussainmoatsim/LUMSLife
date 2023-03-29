import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import "./App.css";

import { UserContext } from './UserContext';
import { UserState } from './UserState';

import Signup from "./components/Signup";

function App() {

  const [accountID, setAccountID] = useState(null)
  const [accountType, setAccountType] = useState(null)
  const [accountName, setAccountName] = useState(null)
  
  const userContext = {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName}

  const userState = {
    accountID: accountID,
    setAccountID: setAccountID,
    accountType: accountType,
    setAccountType: setAccountType,
    accountName: accountName,
    setAccountName: setAccountName
  }

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("userState"))

    if (savedState) {
        userState.setAccountID(savedState.accountID)
        userState.setAccountType(savedState.accountType)
        userState.setAccountName(savedState.accountName)

        userState["accountID"] = savedState.accountID
        userState["accountName"] = savedState.accountType
        userState["accountType"] = savedState.accountName
    }

  }, [])

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={userContext}>
          <UserState.Provider value={userState}>

          <div className="content">
            <Routes>

                <Route exact path="/signup" element={<Signup/>}></Route>

                <Route exact path="/login" element={<Login/>}></Route>

                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </div>
          </UserState.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
