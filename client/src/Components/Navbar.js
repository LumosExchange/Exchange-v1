// Core
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import Axios from "axios";
import { InvisibleButton } from "./Buttons";
import LumosLogo from "./LumosLogo";
import Link from './Link';

// Images
import Logo from "../Images/logo.svg";
import GradientButton from "./GradientButton";
import MobileMenuIcon from "../Images/mobile-menu.svg";

// Components
const Base = styled.div(({ theme }) => css`
    background: ${theme.colors.black};
    font-family: Arial, Helvetica, sans-serif;

    .fixedHeight {
      min-height: 80px;
    }

    svg g {
      fill: ${theme.colors.primary_cta};
    }
`);

const MenuBase = styled.div(({ theme }) => css`
    background: ${theme.colors.black};
    z-index: 2;
    color: ${theme.colors.yellow};
`);

const NavActionButton = styled(InvisibleButton)(({ theme }) => css`
    color: ${theme.colors.yellow};
    &:hover {
        color: ${theme.colors.white};
    }
`);

const Navbar = ({ loginStatus }) => {
  const [showMobileMenu, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const getUserName = () => {
      Axios.get("http://localhost:3001/getUserNameNav", {
      }).then((response) => {
        console.log('get user name fired');
          setUserName(response?.data);
      });
    }

  const navigate = useNavigate();

  const logOut = () => {
    Axios.get("http://localhost:3001/logout", {
    }).then((response) => {
      console.log(response, 'response');
      navigate('/Profile');
      window.location.reload(true);
      console.log('log out fired');
    });
  }

  useEffect(() => {
    if (loginStatus === true) {
      getUserName();
    }
  }, [loginStatus]);

  return (
    <Base className="d-flex justify-content-center">
      <div className="container d-flex fixedHeight">
        <div className="d-flex col-12 justify-content-between align-items-center">
          <a href="/home">
            <LumosLogo alt="Logo" className="me-1" />
          </a>
          {loginStatus ? (
            <React.Fragment>
              <div className="d-none d-lg-block m-auto">
                <Link href="/Market" className="me-4 me-xl-5">
                  Market
                </Link>
                <Link href="/Offers" className="me-4 me-xl-5">
                  Offers
                </Link>
                <Link href="/Trade" className="me-4 me-xl-5">
                  Trade
                </Link>
                <Link href="/MyWallet" className="me-4 me-xl-5">
                  Wallet
                </Link>
                <Link href="/AirDrops">Airdrops</Link>
              </div>
              <div className="align-items-center d-none d-lg-flex">
                <NavActionButton
                    className="d-flex align-items-center"
                    onClick={ () => navigate('/Profile') }
                  >
                    <i className="material-icons me-1">person</i>
                    <span>{userName}</span>
                </NavActionButton>
                <NavActionButton onClick={logOut} className="d-flex">
                    <i className="material-icons ms-3 me-1">logout</i>
                    <span>Log Out</span>
                </NavActionButton>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="d-none d-lg-block m-auto">
                <Link href="/Offers" className="me-4 me-xl-5">
                  Offers
                </Link>
                <Link href="/Cryptos" className="me-4 me-xl-5">
                  Cryptos
                </Link>
                <Link href="/Trade" className="me-4 me-xl-5">
                  How to Trade
                </Link>
                <Link href="/Reviews" className="me-4 me-xl-5">
                  Reviews
                </Link>
                <Link href="/Faq" className="me-4 me-xl-5">
                  FAQ
                </Link>
                <Link href="/AirDrops">Airdrops</Link>
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
          {loginStatus ? (
            <div className="d-flex flex-column p-4 pt-3">
              <Link href="/Offers" className="mb-3">
                Offers
              </Link>
              <Link href="/Cryptos" className="mb-3">
                Cryptos
              </Link>
              <Link href="/Trade" className="mb-3">
                How to Trade
              </Link>
              <Link href="/Wallet" className="mb-3">
                Reviews
              </Link>
              <Link href="/Faq" className="mb-3">
                FAQ
              </Link>
              <Link href="/Airdrops">Airdrops</Link>
            </div>
          ) : (
            <React.Fragment>
              <div className="d-flex flex-column p-4 pt-3">
                <Link href="/Offers" className="mb-3">
                  Offers
                </Link>
                <Link href="/Cryptos" className="mb-3">
                  Cryptos
                </Link>
                <Link href="/Trade" className="mb-3">
                  How to Trade
                </Link>
                <Link href="/Wallet" className="mb-3">
                  Reviews
                </Link>
                <Link href="/Faq" className="mb-3">
                  FAQ
                </Link>
                <Link href="/Airdrops">Airdrops</Link>
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
