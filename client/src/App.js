import React, { useState, useEffect } from "react";
import "./App.css";
import "./Fonts.css";
import { ThemeProvider } from "styled-components";
import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Switch,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UpgradeBronze from "./Pages/UpgradeBronze";
import UpgradeGold from "./Pages/UpgradeGold";
import RegisterCompany from "./Pages/RegisterCompany";
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
import Footer from "./Components/Footer";
import TwoFactorAuth from "./Pages/TwoFactorAuth";
import ConnectWallet from "./Pages/ConnectWallet";
import ChangePassword from "./Pages/ChangePassword";

const theme = {
  colors: {
    black: "#131313",
    white: "#FFF",
    lightGrey: "#CECECE",
    grey: "#3C3C3C",
    darkerGrey: "#2E2E2E",
    yellow: "#F1DF27",
    blueGrey: "#b7b4c7",
    navyGrey: "#212127",
  },
  fonts: {
    primary: "Arial, Helvetica, sans-serif",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
    xxxl: "1600px",
    fhd: "1920px",
    qhd: "2560px",
    uhd: "3840px",
  },
};

function App() {
  //Check
  Axios.defaults.withCredentials = true;

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
        console.log(response);
      }
    });
  }, []);

  //check if user is logged in if so print logged in navbar else normal nav

  console.log();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar isLoggedIn={loginStatus} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/UpgradeBronze" element={<UpgradeBronze />} />
            <Route path="/UpgradeGold" element={<UpgradeGold />} />
            <Route path="/RegisterCompany" element={<RegisterCompany />} />
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
            <Route path="/TwoFactorAuth" element={<TwoFactorAuth />} />
            <Route path="/ConnectWallet" element={<ConnectWallet />} />
            <Route path="/ChangePassword" element={<ChangePassword/>} />
          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
