// Core
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import Axios from "axios";
import { InvisibleButton } from "./Buttons";
import LumosLogo from "./LumosLogo";
// import Link from "./Link";

import { Link } from 'react-router-dom';

import { IconHelper } from "../Pages/Login";
import { AppUrl } from "../App";

// Images
import Logo from "../Images/logo.svg";
import GradientButton from "./GradientButton";

const StyledRect = styled.rect(({ theme }) => css`
	fill: ${theme.colors.primary_cta};
`);

const MobileMenuIcon = () => (
	<svg
		width="30px"
		height="30px"
		viewBox="0 0 20 20"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<title>Mobile Menu</title>
		<g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			<StyledRect id="Rectangle-Copy" fill="" x="0" y="0" width="30" height="2"></StyledRect>
			<StyledRect id="Rectangle-Copy-3" fill="" x="0" y="6" width="30" height="2"></StyledRect>
			<StyledRect id="Rectangle-Copy-4" fill="" x="0" y="12" width="30" height="2"></StyledRect>
		</g>
	</svg>
);

// Components
const Base = styled.div(({ theme }) => css`
	background: ${theme.colors.base_bg};
	font-family: Arial, Helvetica, sans-serif;

	.fixedHeight {
		min-height: 80px;
	}

	svg g {
		fill: ${theme.colors.primary_cta};
	}
`);

const MenuBase = styled.div(({ theme }) => css`
	background: ${theme.colors.base_bg};
	z-index: 2;
	color: ${theme.colors.primary_cta};
`);

const NavActionButton = styled(InvisibleButton)(({ theme }) => css`
	color: ${theme.colors.primary_cta};
	&:hover {
		color: ${theme.colors.text_primary};
	}
`);

const MobileProfileLink = styled.i(({ theme }) => css`
	color: ${theme.colors.primary_cta};
	font-size: 30px; 
`);

const Navbar = ({ loginStatus, userName }) => {
	const [showMobileMenu, setMenuOpen] = useState(false);
	const [accountTier, setAccountTier] = useState("");

	const navigate = useNavigate();

	const logOut = () => {
		Axios.post(`${AppUrl}/logout`).then((response) => {
			if (response.status === 200){
				localStorage.removeItem("token");
				navigate("/Login");
				window.location.reload(true);
			}
		});
	};

	const getAccountTier = () => {
		Axios.get(`${AppUrl}/getUserAccountLevel`).then((response) => {
			setAccountTier(response.data[0]?.accountLevel);
		});
	};

	useEffect(() => {
		if (loginStatus === true){
			getAccountTier();
		}
	}, [loginStatus]);

	return (
		<Base className="d-flex justify-content-center">
			<div className="container d-flex fixedHeight">
				<div className="d-flex col-12 justify-content-between align-items-center">
					<a href="/">
						<LumosLogo alt="Logo" className="me-1" />
					</a>
					{loginStatus ? (
						<React.Fragment>
							<div className="d-none d-lg-block m-auto">
								<Link to="/Buy" className="me-4 me-xl-5">
									Buy &amp; Sell
								</Link>
								<Link to="/MyListings" className="me-4 me-xl-5">
									My Listings
								</Link>
								<Link to="/TradeHistory/Buy" className="me-4 me-xl-5">
									My Trades
								</Link>
								<Link to="/MyWallet" className="me-4 me-xl-5">
									Wallet
								</Link>
								<Link to="/Prices">Cryptos</Link>
							</div>
							<div className="align-items-center d-none d-lg-flex">
								<NavActionButton
									className="d-flex align-items-center"
									onClick={() => navigate("/Profile/Basic")}
								>
									<IconHelper
										className="material-icons me-1"
										title={`Lumos ${accountTier} Account`}
										color={
											(accountTier === "Standard" && 'cta_primary') ||
											(accountTier === "Bronze" && 'bronze') ||
											(accountTier === "Silver" && 'silver') ||
											(accountTier === "Gold" && 'gold')
										}
									>
										{accountTier === 'Standard' ? 'person' : 'verified'}
									</IconHelper>
									<span>{userName}</span>
								</NavActionButton>
								<NavActionButton onClick={() => logOut()} className="d-flex">
									<i className="material-icons ms-3 me-1">logout</i>
									<span>Log Out</span>
								</NavActionButton>
							</div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<div className="d-none d-lg-block m-auto">
								<Link to="/Offers" className="me-4 me-xl-5">
									Offers
								</Link>
								<Link to="/Prices" className="me-4 me-xl-5">
									Cryptos
								</Link>
								<Link to="/Trade" className="me-4 me-xl-5">
									How to Trade
								</Link>
								<Link to="/Reviews" className="me-4 me-xl-5">
									Reviews
								</Link>
								<Link to="/Faq" className="me-4 me-xl-5">
									FAQ
								</Link>
								<Link to="/AirDrops">Airdrops</Link>
							</div>
							<div className="d-none d-lg-block">
								<GradientButton linkTo="/Login" text="Login" as="link" />
							</div>
						</React.Fragment>
					)}
					<div className="d-lg-none d-flex align-items-center">
						{loginStatus && (
							<React.Fragment>
								<button className="bg-transparent border-0" onClick={() => navigate('/Profile/Basic')}>
									<MobileProfileLink className="material-icons">person</MobileProfileLink>
								</button>
								<button className="bg-transparent border-0" onClick={() => logOut()}>
									<MobileProfileLink className="material-icons">logout</MobileProfileLink>
								</button>
							</React.Fragment>
						)}
						{!loginStatus && (
							<button className="bg-transparent border-0 me-2" onClick={() => navigate('/Login')}>
								<MobileProfileLink className="material-icons">login</MobileProfileLink>
							</button>
						)}
						<button className="bg-transparent border-0" onClick={() => setMenuOpen(true)}>
							<MobileMenuIcon alt="Menu" />
						</button>
					</div>
				</div>
			</div>
			{showMobileMenu && (
				<MenuBase className="d-flex d-lg-none position-fixed w-100 h-100 flex-column">
					<div className="d-flex container fixedHeight">
						<div className="col-12 d-flex justify-content-between align-items-center">
							<a href="/home">
								<LumosLogo alt="Logo" className="me-1" />
							</a>
							<div className="d-flex align-items-center">
								{loginStatus && (
									<React.Fragment>
										<button className="bg-transparent border-0" onClick={() => navigate('/Profile/Basic')}>
											<MobileProfileLink className="material-icons">person</MobileProfileLink>
										</button>
										<button className="bg-transparent border-0" onClick={() => logOut()}>
											<MobileProfileLink className="material-icons">logout</MobileProfileLink>
										</button>
									</React.Fragment>
								)}
								{!loginStatus && (
									<button className="bg-transparent border-0 me-2" onClick={() => navigate('/Login')}>
										<MobileProfileLink className="material-icons">login</MobileProfileLink>
									</button>
								)}
								<button className="bg-transparent border-0" onClick={() => setMenuOpen(false)}>
									<MobileMenuIcon alt="Menu" />
								</button>
							</div>
						</div>
					</div>
					{loginStatus ? (
						<div className="container d-flex flex-column p-4 pt-3">
							<Link to="/Buy" className="mb-3">
								Buy &amp; Sell
							</Link>
							<Link to="/MyListings" className="mb-3">
								My Listings
							</Link>
							<Link to="/TradeHistory/Buy" className="mb-3">
								My Trades
							</Link>
							<Link to="/MyWallet" className="mb-3">
								Wallet
							</Link>
							<Link to="/AirDrops">Airdrops</Link>
						</div>
					) : (
						<React.Fragment>
							<div className="d-flex container flex-column p-4 pt-3">
								<Link to="/Offers" className="mb-3">
									Offers
								</Link>
								<Link to="/Prices" className="mb-3">
									Cryptos
								</Link>
								<Link to="/Trade" className="mb-3">
									How to Trade
								</Link>
								<Link to="/Wallet" className="mb-3">
									Reviews
								</Link>
								<Link to="/Faq" className="mb-3">
									FAQ
								</Link>
								<Link to="/Airdrops">Airdrops</Link>
								<div className="py-4">
								<GradientButton
									text="Register Interest"
									linkTo="/Register"
									className="text-decoration-none w-100"
								/>
							</div>
							</div>
						</React.Fragment>
					)}
				</MenuBase>
			)}
		</Base>
	);
};

export default Navbar;