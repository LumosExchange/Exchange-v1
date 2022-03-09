import React, { useState, useEffect } from "react";
import "./App.css";
import "./Fonts.css";
import { ThemeProvider } from "styled-components";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import UpgradeTeam from "./Pages/UpgradeTeam";
import LoggedHome from "./Pages/LoggedHome";
import ErrorPage from "./Pages/ErrorPage";
import Selling from "./Pages/Selling";
import Buy from "./Pages/Buy";
import Sell from "./Pages/Sell";
import Feedback from "./Pages/Feedback";
import Axios from "axios";
import Footer from "./Components/Footer";
import TwoFactorAuth from "./Pages/Auth/TwoFactorAuth";
import ConnectWallet from "./Pages/ConnectWallet";
import ChangePassword from "./Pages/ChangePassword";
import MyWallet from "./Pages/MyWallet";
import TradeHistory from "./Pages/TradeHistory";
import EmailVerification from "./Pages/EmailVerification";
import AirDrops from "./Pages/AirDrops";
import GoogleAuth from "./Pages/Auth/GoogleAuth";
import SMSAuth from "./Pages/Auth/SMSAuth";
import AuthyAuth from "./Pages/Auth/AuthyAuth";
import ThemeToggler, { useDarkMode } from "./Components/ThemeToggler";
import { darkTheme, lightTheme } from "./Constants/Theme";
import ProfileSecurity from "./Pages/Profile/Security";
import ProfileBasic from "./Pages/Profile/Basic";
import ProfileKYC from "./Pages/Profile/KnowYourCustomer";
import PaymentMethods from "./Pages/Profile/PaymentMethods";
import AccountUpgrade from "./Pages/Profile/AccountUpgrade";
import Offer from "./Pages/Offer";
import MyListings from "./Pages/MyListings";
import Buying from './Pages/Buying';
import Selling2 from "./Pages/Selling2";





const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  const [currency, setCurrency] = useState("");
  const [solGbp, setSolGbp] = useState(0);
  const [solUsd, setSolUsd] = useState(0);
  const [loginStatus, setLoginStatus] = useState(false);
  const [userName, setUserName] = useState("");

  //Check
  Axios.defaults.withCredentials = true;


  // Set global params
	const getCurrencyAndSolPrice = () => {
		Axios.get("http://localhost:3001/getUserSettings").then((response) => {
			if(response.data[0]?.currency === 'GBP') {
				setCurrency('GBP');
				//Get GBP price of SOlana
				fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=gbp').then((response) => response.json().then(function (data) {
					setSolGbp(data.solana.gbp);
				}));	
			} else if (response.data[0]?.currency === 'USD') {
				setCurrency('USD');
				//Get USD price of solana
				fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd').then((response) => response.json().then(function (data) {
					setSolUsd(data.solana.usd);
				}));
			} else {
				//handle other currencys
				setCurrency('GBP');
			}
		});
	}

  const getUserLoginStatus = () => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
        console.log(response);
      }
    });
  }

  const getUserName = () => {
		Axios.get("http://localhost:3001/getUserNameNav").then((response) => {
			setUserName(response.data);
		});
	};

  useEffect(() => {
    getUserLoginStatus();
    getCurrencyAndSolPrice();
    getUserName();
  }, []);

  console.log(userName, 'username');

  return (
    <React.Fragment>
      <ThemeProvider theme={themeMode}>
        <Router>
          <ThemeToggler theme={theme} toggleTheme={toggleTheme} solgbp={solGbp} currency={currency} />
          <Navbar loginStatus={loginStatus} userName={userName} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />

            <Route path="/UpgradeTeam" element={<UpgradeTeam />} />
            <Route path="*" element={<ErrorPage />} />
            {/* These need to be protected routes eventually */}
            {!loginStatus ? (
              <Route path="/Home" element={<Home />} />
            ) : (
              <Route path="/Home" element={<LoggedHome />} />
            )}
            ;
            <Route path="/Buy" element={<Buy solGbp={solGbp} solUsd={solUsd} currency={currency} />} />
            <Route path="/Sell" element={<Sell />} />
            <Route path="/Selling" element={<Selling2 userName={userName} />} />
            <Route path="/Offer" element={<Offer solGbp={solGbp} solUsd={solUsd} currency={currency} />} />
            <Route path="/TradeHistory" element={<TradeHistory />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/TwoFactorAuth" element={<TwoFactorAuth />} />
            <Route path="/ConnectWallet" element={<ConnectWallet />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/MyWallet" element={<MyWallet />} />
            <Route path="/EmailVerification" element={<EmailVerification />} />
            <Route path="/AirDrops" element={<AirDrops />} />
            <Route path="/GoogleAuth" element={<GoogleAuth />} />
            <Route path="/SMSAuth" element={<SMSAuth />} />
            <Route path="/AuthyAuth" element={<AuthyAuth />} />
            <Route path="/Profile/Security" element={<ProfileSecurity />} />
            <Route path="/Profile/Basic" element={<ProfileBasic />} />
            <Route path="/Profile/KYC" element={<ProfileKYC />} />
            <Route
              path="/Profile/PaymentMethods"
              element={<PaymentMethods />}
            />
            <Route path="/Profile/AccountUpgrade" element={<AccountUpgrade />} />
            <Route path="/MyListings" element={<MyListings />} />
            <Route path="/Buying" element={<Buying userName={userName} />} />

          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
