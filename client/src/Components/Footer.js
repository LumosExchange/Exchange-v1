import React from "react";
import styled, { css } from "styled-components";
import { FormInput } from "./FormInputs";
import GradientButton from "./GradientButton";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import LumosLogo from "./LumosLogo";
import { FooterLink } from "./Link";

const FooterBase = styled.footer(({ theme }) => css`
	background: ${theme.colors.base_bg};
	border-top: 1px solid ${theme.colors.grey};

	p {
		font-size: 14px;
		
		@media screen and (min-width: ${theme.breakpoints.sm}){
			font-size: 18px;
		}
	}

	a {
		font-size: 14px;
		padding: 5px 0;
		text-decoration: none;

		@media screen and (min-width: ${theme.breakpoints.sm}){
			font-size: 18px;
		}
	}

	.spacer {
		width: 32px;
		min-height: 32px;
	}

	.subfooter {
		border-top: 1px solid ${theme.colors.grey};

		img { width: 150px; }
	}

	svg g { fill: ${theme.colors.primary_cta}; }
`);

const Footer = () => (
    <FooterBase>
		<div className="container pt-5 px-4 pb-3">
				<div className="w-100 d-flex flex-column">
					<div className="row">
						<div className="col-4 col-sm-3 d-flex flex-column mb-5 mb-md-0">
							<Heading size="20px" bold>Sitemap</Heading>
							<FooterLink href="/About" alt="About">About</FooterLink>
							<FooterLink href="/Solutions" alt="Solutions">Solutions</FooterLink>
							<FooterLink href="/Investing" alt="Investing">Investing</FooterLink>
							<FooterLink href="/Team" alt="Team">Team</FooterLink>
							<FooterLink href="/Careers" alt="Careers">Careers</FooterLink>
							<FooterLink href="/Contract" alt="Contract">Contact</FooterLink>
						</div>
						<div className="col-4 col-sm-3 col-md-2 d-flex flex-column">
							<div className="spacer" />
							<FooterLink href="/NFTs" alt="NFTs">NFTs</FooterLink>
							<FooterLink href="/Partners" alt="Partners">Partners</FooterLink>
							<FooterLink href="/Library" alt="Library">Library</FooterLink>
							<FooterLink href="/Roadmap" alt="Roadmap">Roadmap</FooterLink>
							<FooterLink href="/Greenmap" alt="Greenmap">Greenmap</FooterLink>
							<FooterLink href="/Whitepaper" alt="Whitepaper">Whitepaper</FooterLink>
						</div>
						<div className="col-4 col-sm-3 d-flex flex-column mb-5 mb-md-0">
							<Heading size="20px" bold>Legal</Heading>
							<FooterLink href="/Terms" alt="Terms">Our Terms</FooterLink>
							<FooterLink href="/Privacy" alt="Privacy">Your Privacy</FooterLink>
						</div>
						<div className="col-12 col-md-4 d-flex flex-column">
							<Heading size="20px" bold>Subscribe to our newsletter</Heading>
							<Paragraph size="18px">Get regular project updates and access to new events on Discord, Twitter or in the real world.</Paragraph>
							<div className="col-12 d-flex flex-column flex-lg-row">
								<FormInput rounded placeholder="Your Email Address" className="me-3 w-100 mb-3 mb-lg-0" />
								<GradientButton as="button" text="Subscribe" />
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="d-flex col-12 justify-content-between align-items-center subfooter pt-4 mt-5">
						<a href="/home">
							<LumosLogo width="150px" alt="Logo" className="me-1 w-50" />
						</a>
						<Paragraph color="blueGrey">&copy; 2022 Lumos Exchange</Paragraph>
					</div>
				</div>
		</div>
    </FooterBase>
);

export default Footer;
