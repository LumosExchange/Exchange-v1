import React, { useState, useEffect } from "react";
import "./App.css";
import "./Fonts.css";
import { ThemeProvider } from "styled-components";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UpgradeTeam from "./Pages/UpgradeTeam";
import LoggedHome from "./Pages/LoggedHome";
import ErrorPage from "./Pages/ErrorPage";
import Selling from "./Pages/Selling";
import Buy from "./Pages/Buy";
import Sell from "./Pages/Sell";
import Axios from "axios";
import Footer from "./Components/Footer";
import ConnectWallet from "./Pages/ConnectWallet";
import ChangePassword from "./Pages/ChangePassword";
import MyWallet from "./Pages/MyWallet";
import TradeHistoryBuy from "./Pages/TradeHistory/Buy";
import TradeHistorySell from "./Pages/TradeHistory/Sell";
import TradeHistoryCompleted from "./Pages/TradeHistory/Completed";
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
import UpgradeInfo from "./Pages/Profile/UpgradeInfo";
import PaymentMethods from "./Pages/Profile/PaymentMethods";
import AccountUpgrade from "./Pages/Profile/AccountUpgrade";
import Offer from "./Pages/Offer";
import MyListings from "./Pages/MyListings";
import Buying from "./Pages/Buying";
import Wallets from "./Pages/Profile/Wallets";
import Feedback from "./Pages/Feedback";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Prices from './Pages/Prices';
import WalletTesting from './Pages/WalletTesting';
import TradeComplete from './Pages/TradeComplete';

export const AppUrl = "http://localhost:3001";
export const AppUrlNoPort = "http://localhost";
export const SocketUrl = "http://localhost:3002";

// Prod Details
// export const AppUrl = "http://3.8.159.233:3001";
// export const AppUrlNoPort = "http://3.8.159.233";
// export const SocketUrl = "http://3.8.159.233:3002";

const App = () => {
	const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === "light" ? lightTheme : darkTheme;
	const [currency, setCurrency] = useState("");
	const [solGbp, setSolGbp] = useState(0);
	const [solUsd, setSolUsd] = useState(0);
	const [loginStatus, setLoginStatus] = useState("");
	const [userName, setUserName] = useState("");

	//Check
	Axios.defaults.withCredentials = true;

	// Set global params
	const getCurrencyAndSolPrice = () => {
		if (loginStatus === true){
			Axios.get(`${AppUrl}/getUserSettings`).then((response) => {
				if (response.data[0]?.currency === "GBP") {
					setCurrency("GBP");
					//Get GBP price of SOlana
					fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=gbp").then((response) =>
						response.json().then(function (data) {
							setSolGbp(data.solana.gbp);
						})
					);
				} else if (response.data[0]?.currency === "USD") {
					setCurrency("USD");
					//Get USD price of solana
					fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd").then((response) =>
						response.json().then(function (data) {
							setSolUsd(data.solana.usd);
						})
					);}
				});
		} else {
			fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=gbp").then((response) =>
				response.json().then(function (data) {
					setSolGbp(data.solana.gbp);
					setCurrency('GBP');
				})
			);
		}
	};

	const getUserLoginStatus = () => {
		Axios.get(`${AppUrl}/login`).then((response) => {
			if (response.data.loggedIn === true) {
				setLoginStatus(true);
			} else {
				// Navigate('/');
			}
		});
	};

	const getUserName = () => {
		Axios.get(`${AppUrl}/getUserNameNav`).then((response) => {
			setUserName(response.data);
		});
	};

	useEffect(() => {
		getUserLoginStatus();
		getCurrencyAndSolPrice();

		if (loginStatus === true){
			getUserName();
		}
		
	}, [loginStatus, solGbp, userName]);

	return (
		<React.Fragment>
			<ThemeProvider theme={themeMode}>
				<Router>
					<ThemeToggler theme={theme} toggleTheme={toggleTheme} solgbp={solGbp} currency={currency} />
					<Navbar loginStatus={loginStatus} userName={userName} />
					<Routes>
						{/* Unprotected Routes */}
						<Route path="/" element={<Home theme={theme} />} />
						<Route path="/Login" element={<Login />} />
						<Route path="/Register" element={<Register />} />
						<Route path="*" element={<ErrorPage />} />
						<Route path="/Prices" element={<Prices />} />
						<Route path="/EmailVerification" element={<EmailVerification />} />
						<Route path="/wallettesting" element={<WalletTesting />} />

						{/* Protected Routes */}
						<Route path="/" element={<ProtectedRoutes />}>
							<Route path="/Profile/Security" element={<ProfileSecurity />} />
							<Route path="/Profile/Basic" element={<ProfileBasic />} />
							<Route path="/Profile/KYC" element={<ProfileKYC />} />
							<Route path="/Profile/UpgradeInfo" element={<UpgradeInfo />} />
							<Route path="/Profile/Wallets" element={<Wallets />} />
							<Route path="/UpgradeTeam" element={<UpgradeTeam />} />
							<Route path="/Buy" element={<Buy solGbp={solGbp} solUsd={solUsd} currency={currency} userName={userName} />} />
							<Route path="/Sell" element={<Sell />} />
							<Route path="/Selling" element={<Selling userName={userName} />} />
							<Route path="/Offer" element={<Offer solGbp={solGbp} solUsd={solUsd} currency={currency} />} />
							<Route path="/TradeHistory/Buy" element={<TradeHistoryBuy />} />
							<Route path="/TradeHistory/Sell" element={<TradeHistorySell />} />
							<Route path="/TradeHistory/Completed" element={<TradeHistoryCompleted />} />
							<Route path="/profile/user/:id" element={<Feedback />} />
							<Route path="/ConnectWallet" element={<ConnectWallet />} />
							<Route path="/ChangePassword" element={<ChangePassword />} />
							<Route path="/MyWallet" element={<MyWallet />} />
							<Route path="/AirDrops" element={<AirDrops />} />
							<Route path="/GoogleAuth" element={<GoogleAuth />} />
							<Route path="/SMSAuth" element={<SMSAuth />} />
							<Route path="/AuthyAuth" element={<AuthyAuth />} />
							<Route path="/TradeComplete" element={<TradeComplete />} />
							<Route path="/Profile/PaymentMethods" element={<PaymentMethods />} />
							<Route path="/Profile/AccountUpgrade" element={<AccountUpgrade />} />
							<Route
								path="/MyListings"
								element={<MyListings solGbp={solGbp} solUsd={solUsd} currency={currency} />}
							/>
							<Route path="/Buying" element={<Buying userName={userName} />} />
						</Route>
					</Routes>
				</Router>
				<Footer />
			</ThemeProvider>
		</React.Fragment>
	);
};

export default App;
