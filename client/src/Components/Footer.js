import React from "react";
import styled, { css } from "styled-components";
import { FormInput } from "./FormInputs";
import GradientButton from "./GradientButton";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import LumosLogo from "./LumosLogo";
import { FooterLink } from "./Link";
import { Link } from "react-router-dom";

const FooterBase = styled.footer(
  ({ theme }) => css`
    background: ${theme.colors.base_bg};
    border-top: 1px solid ${theme.colors.grey};

    p {
      font-size: 14px;

      @media screen and (min-width: ${theme.breakpoints.sm}) {
        font-size: 18px;
      }
    }

    a {
      font-size: 14px;
      padding: 5px 0;
      text-decoration: none;

      @media screen and (min-width: ${theme.breakpoints.sm}) {
        font-size: 18px;
      }
    }

    .spacer {
      width: 32px;
      min-height: 32px;
    }

    .subfooter {
      border-top: 1px solid ${theme.colors.grey};

      img {
        width: 150px;
      }
    }

    svg g {
      fill: ${theme.colors.primary_cta};
    }
  `
);

const Footer = () => (
  <FooterBase>
    <div className="container pt-5 px-4 pb-3">
      <div className="w-100 d-flex flex-column">
        <div className="row">
          <div className="col-4 col-sm-3 d-flex flex-column mb-5 mb-md-0">
            <Heading size="20px" bold>
              Sitemap
            </Heading>
            <FooterLink
              href="https://www.lumos.exchange/about"
              target="_blank"
              alt="About"
            >
              About
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/team"
              target="_blank"
              alt="Team"
            >
              Team
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/careers"
              target="_blank"
              alt="Carrers"
            >
              Carrers
            </FooterLink>
            <FooterLink
              href="https://ambassadors.lumos.exchange/"
              target="_blank"
              alt="Ambassadors"
            >
              Ambassadors
            </FooterLink>

            <FooterLink
              href="https://library.lumos.exchange/view-roadmap"
              target="_blank"
              alt="Roadmap"
            >
              Roadmap
            </FooterLink>
            <FooterLink
              href="https://library.lumos.exchange/greenmap/view-greenmap"
              target="_blank"
              alt="Greenmap"
            >
              Greenmap
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/coming-soon/whitepaper"
              target="_blank"
              alt="Whitepaper"
            >
              Whitepaper
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/contact"
              target="_blank"
              alt="Contact"
            >
              Contact
            </FooterLink>
          </div>
          <div className="col-4 col-sm-3 col-md-2 d-flex flex-column">
            <div className="spacer" />
            <FooterLink
              href="https://www.lumos.exchange/ecosystem/exchange"
              target="_blank"
              alt="Exchange"
            >
              Exchange
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/ecosystem/asset"
              target="_blank"
              alt="Asset"
            >
              Asset
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/ecosystem/nft-market"
              target="_blank"
              alt="NFTMarket"
            >
              NFT Market
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/ecosystem/liquidity-farm"
              target="_blank"
              alt="LiquidityFarm"
            >
              Liquidity Farm
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/ecosystem/debit-cards"
              target="_blank"
              alt="Debit Cards"
            >
              Debit Cards
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/ecosystem/mass-pay"
              target="_blank"
              alt="Mass Pay"
            >
              Mass Pay
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/dao"
              target="_blank"
              alt="DAO"
            >
              DAO
            </FooterLink>
          </div>

          <div className="col-4 col-sm-3 d-flex flex-column mb-5 mb-md-0">
            <Heading size="20px" bold>
              NFTs
            </Heading>
            <FooterLink
              href="https://www.lumos.exchange/nfts/luminites"
              alt="Luminities"
            >
              Luminities
            </FooterLink>
            <FooterLink
              href="https://www.lumos.exchange/nfts/access-cards"
              alt="Access Cards"
            >
              Access Cards
            </FooterLink>
          </div>
          <div className="col-12 col-md-4 d-flex flex-column">
            <Heading size="20px" bold>
              Subscribe to our newsletter
            </Heading>
            <Paragraph size="18px">
              Get regular project updates and access to new events on Discord,
              Twitter or in the real world.
            </Paragraph>
            <div className="col-12 d-flex flex-column flex-lg-row">
              <FormInput
                rounded
                placeholder="Your Email Address"
                className="me-lg-3 w-100 mb-3 mb-lg-0"
              />
              <GradientButton as="button" text="Subscribe" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex col-12 justify-content-between align-items-center subfooter pt-4 mt-5">
          <a href="/">
            <LumosLogo width="150px" alt="Logo" className="me-1 w-50" />
          </a>
          <Paragraph>&copy; 2022 Lumos Exchange</Paragraph>
        </div>
      </div>
    </div>
  </FooterBase>
);

export default Footer;
