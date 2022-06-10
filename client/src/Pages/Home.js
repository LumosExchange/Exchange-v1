import React from "react";
import styled, { css } from "styled-components";
import { PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import GradientButton from "../Components/GradientButton";
import { SecondaryButton, LinkButton } from "../Components/Buttons";
import Paragraph from "../Components/Paragraph";
import { Link } from "react-router-dom";

// Images
import ShowCaseDark from "../Images/showcase_dark.png";
import ShowCaseLight from "../Images/showcase_light.png";
import ShowCaseDarkMobile from "../Images/showcase_dark_mobile.png";
import ShowCaseLightMobile from "../Images/showcase_light_mobile.png";
import IconSolana from "../Images/icon-circle-solana.svg";
import IconLumosRewards from "../Images/icon-circle-lumos.svg";
import IconKin from "../Images/icon-circle-kin.svg";
import MobileAccentShapeDark from "../Images/mobile-accent-shape-dark.svg";
import MobileAccentShapeLight from "../Images/mobile-accent-shape-light.svg";
import {
  HandShakeIcon,
  GlobeIcon,
  DoubleDipIcon,
  FeeJarIcon,
  CopeIcon,
} from "../Components/SVGComponents";
import { useNavigate } from "react-router";

const ShowcaseBase = styled.div(
  ({ theme, currentTheme }) => css`
    min-height: 600px;
    background: ${currentTheme === "dark"
      ? `url(${ShowCaseDarkMobile})`
      : `url(${ShowCaseLightMobile})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 1;

    @media screen and (min-width: ${theme.breakpoints.lg}) {
      background: ${currentTheme === "dark"
        ? `url(${ShowCaseDark})`
        : `url(${ShowCaseLight})`};
      background-size: 80%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  `
);

const Card = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.card_bg};
    border-radius: 20px;
  `
);

const IconCard = ({ icon, title, text, children, link }) => (
  <Link
    to={`/Prices#${link}`}
    className="col-12 col-sm-6 col-md-6 col-xl-3 mb-4 mb-xl-0 text-decoration-none"
  >
    <Card className="p-4 text-center mb-4 mb-xl-0 h-100">
      {children}
      {/* Make these icons tomorrow */}
      <Heading size="24px" bold>
        {title}
      </Heading>
      <Paragraph size="14px">{text}</Paragraph>
    </Card>
  </Link>
);

const GradientHeading = styled(Heading)(
  ({ theme }) => css`
    @supports (-webkit-background-clip: text) {
      background: -webkit-linear-gradient(
        300deg,
        #fce608,
        #ff7586,
        #b372ce,
        #6f86ff
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `
);

const Showcase = ({ theme }) => (
  <ShowcaseBase className="position-relative mb-5 w-100" currentTheme={theme} />
);

const AccentShape = styled.img(
  ({ theme }) => css`
    position: absolute;
    display: block;
    bottom: 30px;
    left: -5%;
    width: 105%;
    z-index: 0;

    @media screen and (min-width: ${theme.breakpoints.sm}) {
      bottom: 0px;
    }

    @media screen and (min-width: ${theme.breakpoints.lg}) {
      display: none;
    }
  `
);

const Home = ({ theme }) => {
  const navigate = useNavigate();
  return (
    <PageBody>
      <div className="row pt-5 d-flex justify-content-center container m-auto p-0">
        <div className="col-12 col-lg-6 col-xxl-5 d-flex align-items-center justify-content-center">
          <div className="my-5">
            <Heading size="48px" bold className="mb-0">
              Non-Custodial,
            </Heading>
            <GradientHeading size="48px" bold>
              P2P Trading For Solana
            </GradientHeading>

            <div className="row mt-5 pt-5">
              <div className="col-12 col-sm-6">
                <GradientButton
                  text="Sign Up"
                  className="w-100 mb-3"
                  fontSize="20px"
                  onClick={() => navigate("/Register")}
                />
              </div>
              <div className="col-12 col-sm-6">
                <SecondaryButton
                  className="w-100"
                  round
                  color="navyGrey"
                  textColor="white"
                  text="How it Works"
                  boldText={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-xxl-7 position-relative">
          <Showcase theme={theme} />
          <AccentShape
            src={
              theme === "dark" ? MobileAccentShapeDark : MobileAccentShapeLight
            }
            alt="dasd"
            className="d-sm-none"
          />
        </div>
      </div>
      <div className="container mt-4">
        <div className="row justify-content-center mb-4">
          <IconCard
            link="solana"
            title="Solana"
            icon={IconSolana}
            text="The open-source crypto with the fastest responsive speed and rapidly growing ecosystem."
          >
            <img src={IconSolana} alt="Solana" className="mb-3" />
          </IconCard>
          <IconCard
            link="solana"
            title="Lumos Rewards"
            text="Our SPL asset focused on providing users an incentive to trade regularly, event participation & referrals."
          >
            <img src={IconLumosRewards} alt="Lumos" className="mb-3" />
          </IconCard>
          <IconCard
            title="KIN"
            text="The open-source crypto with the fastest responsive speed and rapidly growing ecosystem."
          >
            <img src={IconKin} alt="KIN" className="mb-3" />
          </IconCard>
          <IconCard
            title="COPE"
            text="The open-source crypto with the fastest responsive speed and rapidly growing ecosystem."
          >
            <div className="mb-3">
              <CopeIcon />
            </div>
          </IconCard>
        </div>
        <div className="row justify-content-between align-items-center py-6">
          <div className="col-12 col-xl-4 mb-5 mb-xl-0 p-4">
            <Heading size="48px">
              Your Coins <br />
              In Your Seize
            </Heading>
            <Paragraph size="22px">
              Lumos Exchange is the first non-custodial peer-to-peer platform
              for Solana. We allow users trade with each other in safety, and
              protects your wallet from theft.
            </Paragraph>
            <LinkButton
              text="View The Marketplace"
              className="mt-5 p-0"
              color="black"
              textColor="yellow"
              onClick={() => navigate("/Buy")}
              hasIcon
              fontSize="28px"
            />
          </div>
          <div className="col-12 col-xl-8">
            <div className="row">
              <div className="col-12 col-lg-6 mb-3">
                <Card className="d-flex p-4 h-100">
                  <HandShakeIcon alt="Non Custodial" />
                  <div className="ms-4 d-flex flex-column justify-content-center">
                    <Heading size="24px">Non-custodial</Heading>
                    <Paragraph size="18px">
                      You exchange directly with another person, fast and easy.
                      Say goodbye to slow middleman.
                    </Paragraph>
                  </div>
                </Card>
              </div>
              <div className="col-12 col-lg-6 mb-3">
                <Card className="d-flex p-4 h-100">
                  <FeeJarIcon alt="No Trading Fee" />
                  <div className="ms-4 d-flex flex-column justify-content-center">
                    <Heading size="24px">No Trading Fee</Heading>
                    <Paragraph size="18px">
                      No more handling fee and custody. You have full control
                      over your wallet.
                    </Paragraph>
                  </div>
                </Card>
              </div>
              <div className="col-12 col-lg-6 mb-3">
                <Card className="d-flex p-4 h-100">
                  <GlobeIcon alt="Worldwide" />
                  <div className="ms-4 d-flex flex-column justify-content-center">
                    <Heading size="24px">Trade the Network</Heading>
                    <Paragraph size="18px">
                      Our service is available around the world with 30+ ways to
                      pay, including bank transfer, PayPal and more.
                    </Paragraph>
                  </div>
                </Card>
              </div>
              <div className="col-12 col-lg-6 mb-3">
                <Card className="d-flex p-4 h-100">
                  <DoubleDipIcon alt="Secured" />
                  <div className="ms-4 d-flex flex-column justify-content-center">
                    <Heading size="24px">Double Dip Income</Heading>
                    <Paragraph size="18px">
                      All users are protected by end-to-end encrypted message
                      and escrow accounts. Trade safely!
                    </Paragraph>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageBody>
  );
};

export default Home;
