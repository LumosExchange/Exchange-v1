// Core
import React, { useState } from "react";
import styled, { css } from "styled-components";

// Images
import Logo from '../Images/logo.png';
import GradientButton from "./GradientButton";
import MobileMenuIcon from '../Images/mobile-menu.svg';

// Components
const Base = styled.div(({ theme }) => css`
    background: ${theme.colors.black};
    font-family: Arial, Helvetica, sans-serif;

	.fixedHeight { min-height: 80px; }

	button {
		height: 32px;
		width: 70px;
		font-size: 16px;
	}
`);

const NavLink = styled.a(({ theme }) => css`
	color: ${theme.colors.white};
	text-decoration: none;
	font-size: 25px;

	@media screen and (min-width: ${theme.breakpoints.lg}) {
		font-size: 16px;
	}

	&:hover {
		color: ${theme.colors.yellow};
	}
`);

const MenuBase = styled.div(({ theme }) => css`
	background: ${theme.colors.black};
	z-index: 2;
	color: ${theme.colors.yellow};
`);

const Navbar = () => {
	const[showMobileMenu, setMenuOpen] = useState(false);
  	return (
		<Base className="d-flex justify-content-center">
			<div className="container-fluid d-flex fixedHeight">
				<div className="d-flex col-12 justify-content-between align-items-center">
					<a href="/home">
						<img src={Logo} alt="Logo" className="me-1" />
					</a>
					<div className="d-none d-lg-block m-auto">
						<NavLink href="/Offers" className="me-5">Offers</NavLink>
						<NavLink href="/Cryptos" className="me-5">Cryptos</NavLink>
						<NavLink href="/Trade" className="me-5">How to Trade</NavLink>
						<NavLink href="/Wallet" className="me-5">Reviews</NavLink>
						<NavLink href="/Faq" className="me-5">FAQ</NavLink>
						<NavLink href="/Airdrops">Airdrops</NavLink>
					</div>
					<div className="d-none d-lg-block">
						<GradientButton linkTo="/Register" text="Sign In" />
					</div>
					<div className="d-lg-none">
						<button
							className="bg-transparent border-0"
							onClick={ () => setMenuOpen(true) }>
							<img src={ MobileMenuIcon } alt="Menu" />
						</button>
					</div>
				</div>
			</div>
			{showMobileMenu && (
				<MenuBase className="d-flex d-lg-none position-fixed w-100 h-100 flex-column">
					<div className="d-flex container-fluid fixedHeight">
						<div className="col-12 d-flex justify-content-between align-items-center">
							<a href="/home">
								<img src={Logo} alt="Logo" className="me-1" />
							</a>
							<button
								className="bg-transparent border-0"
								onClick={ () => setMenuOpen(false) }>
								<img src={ MobileMenuIcon } alt="Menu" />
							</button>
						</div>
					</div>
					<div className="d-flex flex-column p-4 pt-3">
						<NavLink href="/Offers" className="mb-3">Offers</NavLink>
						<NavLink href="/Cryptos" className="mb-3">Cryptos</NavLink>
						<NavLink href="/Trade" className="mb-3">How to Trade</NavLink>
						<NavLink href="/Wallet" className="mb-3">Reviews</NavLink>
						<NavLink href="/Faq" className="mb-3">FAQ</NavLink>
						<NavLink href="/Airdrops">Airdrops</NavLink>
					</div>
					<div className="p-4">
						<GradientButton text="Register Interest" linkTo="/Register" className="text-decoration-none w-100" />
					</div>
				</MenuBase>
			)}
		</Base>
	);
}

export default Navbar;
