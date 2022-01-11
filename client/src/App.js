import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Switch,
  useLocation
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import LoggedNavbar from "./Components/LoggedNavbar";
import LoggedHome from "./Pages/LoggedHome";
import ErrorPage from "./Pages/ErrorPage";
import Trades from "./Pages/Trades";
import Account from "./Pages/Account";
import Buy from "./Pages/Buy";
import Sell from "./Pages/Sell";
import Offer from "./Pages/Offer";
import Feedback from "./Pages/Feedback";
import Axios from "axios";

function App() {
  //Check
  Axios.defaults.withCredentials = true;

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].email);
        console.log(response);
      }
    });
  }, []);

  //check if user is logged in if so print logged in navbar else normal nav

  return (
    <Router>
      {!loginStatus ? (
        <div className="Navbar">
          <Navbar />
        </div>
      ) : (
        <div className="LoggedNavbar">
          <LoggedNavbar />
        </div>
      )}
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
        //These need to be protected routes eventually
        {!loginStatus ? (
          <Route path="/Home" element={<Home />} />
        ) : (
          <Route path="/Home" element={<LoggedHome />} />
        )}
        ;
        <Route path="/Offer" element={<Offer />} />
        <Route path="/Sell" element={<Sell />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/Trades" element={<Trades />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Feedback" element={<Feedback />} />
      
        
      </Routes>
      <div>Footer</div>
    </Router>
  );
}

export default App;
