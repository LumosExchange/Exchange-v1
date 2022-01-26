// Core
import React, { useState, useEffect, setState } from "react";
import styled, { css } from "styled-components";

import Axios from "axios";

// Images
import Logo from "../Images/logo.png";
import GradientButton from "./GradientButton";
import MobileMenuIcon from "../Images/mobile-menu.svg";

// Components
const Base = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.black};
    font-family: Arial, Helvetica, sans-serif;

    .fixedHeight {
      min-height: 80px;
    }
  `
);

const NavLink = styled.a(
  ({ theme }) => css`
    color: ${theme.colors.white};
    text-decoration: none;
    font-size: 18px;
    font-family: "THICCCBOI-REGULAR";

    &:hover {
      color: ${theme.colors.yellow};
    }
  `
);

const ProfileLink = styled.a(
  ({ theme }) => css`
    color: ${theme.colors.yellow};
    text-decoration: none;
    font-size: 18px;
    font-family: "THICCCBOI-REGULAR";

    &:hover {
      color: ${theme.colors.white};
    }
  `
);

const MenuBase = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.black};
    z-index: 2;
    color: ${theme.colors.yellow};
  `
);


//get username

const Navbar = ({ isLoggedIn }) => {
  const [showMobileMenu, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');


  useEffect(() => {
    Axios.get("http://localhost:3001/getUserNameNav", {
    }).then((response) => {
      setUserName(response.data);
      console.log(userName);
    });
  }, []);

  return (
    <Base className="d-flex justify-content-center">
      <div className="container d-flex fixedHeight">
        <div className="d-flex col-12 justify-content-between align-items-center">
          <a href="/home">
            <img src={Logo} alt="Logo" className="me-1" />
          </a>
          {isLoggedIn ? (
            <React.Fragment>
              <div className="d-none d-lg-block m-auto">
                <NavLink href="/Market" className="me-4 me-xl-5">
                  Market
                </NavLink>
                <NavLink href="/Offers" className="me-4 me-xl-5">
                  Offers
                </NavLink>
                <NavLink href="/Trade" className="me-4 me-xl-5">
                  Trade
                </NavLink>
                <NavLink href="/MyWallet" className="me-4 me-xl-5">
                  Wallet
                </NavLink>
                <NavLink href="/AirDrops">Airdrops</NavLink>
              </div>
              <div className="align-items-center d-none d-lg-flex">
                <i className="material-icons me-3 text-white">notifications</i>
                <ProfileLink>{userName}</ProfileLink>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="d-none d-lg-block m-auto">
                <NavLink href="/Offers" className="me-4 me-xl-5">
                  Offers
                </NavLink>
                <NavLink href="/Cryptos" className="me-4 me-xl-5">
                  Cryptos
                </NavLink>
                <NavLink href="/Trade" className="me-4 me-xl-5">
                  How to Trade
                </NavLink>
                <NavLink href="/Reviews" className="me-4 me-xl-5">
                  Reviews
                </NavLink>
                <NavLink href="/Faq" className="me-4 me-xl-5">
                  FAQ
                </NavLink>
                <NavLink href="/AirDrops">Airdrops</NavLink>
              </div>
              <div className="d-none d-lg-block">
                <GradientButton linkTo="/Login" text="Login" as="link" />
              </div>
            </React.Fragment>
          )}
          <div className="d-lg-none">
            <button
              className="bg-transparent border-0"
              onClick={() => setMenuOpen(true)}
            >
              <img src={MobileMenuIcon} alt="Menu" />
            </button>
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <MenuBase className="d-flex d-lg-none position-fixed w-100 h-100 flex-column">
          <div className="d-flex container fixedHeight">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <a href="/home">
                <img src={Logo} alt="Logo" className="me-1" />
              </a>
              <button
                className="bg-transparent border-0"
                onClick={() => setMenuOpen(false)}
              >
                <img src={MobileMenuIcon} alt="Menu" />
              </button>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="d-flex flex-column p-4 pt-3">
              <NavLink href="/Offers" className="mb-3">
                Offers
              </NavLink>
              <NavLink href="/Cryptos" className="mb-3">
                Cryptos
              </NavLink>
              <NavLink href="/Trade" className="mb-3">
                How to Trade
              </NavLink>
              <NavLink href="/Wallet" className="mb-3">
                Reviews
              </NavLink>
              <NavLink href="/Faq" className="mb-3">
                FAQ
              </NavLink>
              <NavLink href="/Airdrops">Airdrops</NavLink>
            </div>
          ) : (
            <React.Fragment>
              <div className="d-flex flex-column p-4 pt-3">
                <NavLink href="/Offers" className="mb-3">
                  Offers
                </NavLink>
                <NavLink href="/Cryptos" className="mb-3">
                  Cryptos
                </NavLink>
                <NavLink href="/Trade" className="mb-3">
                  How to Trade
                </NavLink>
                <NavLink href="/Wallet" className="mb-3">
                  Reviews
                </NavLink>
                <NavLink href="/Faq" className="mb-3">
                  FAQ
                </NavLink>
                <NavLink href="/Airdrops">Airdrops</NavLink>
              </div>
              <div className="p-4">
                <GradientButton
                  text="Register Interest"
                  linkTo="/Register"
                  className="text-decoration-none w-100"
                />
              </div>
            </React.Fragment>
          )}
        </MenuBase>
      )}
    </Base>
  );
};

export default Navbar;
