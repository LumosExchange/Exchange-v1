import React from "react";
import styled, { css } from "styled-components";
import { FormInput } from "./FormInputs";
import GradientButton from "./GradientButton";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import LumosLogo from "./LumosLogo";
import { FooterLink } from "./Link";
import { Link } from 'react-router-dom';

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
							<FooterLink href="https://www.lumos.exchange/about" target="_blank" alt="About">About</FooterLink>
							<FooterLink href="https://www.lumos.exchange/solutions" target="_blank" alt="Solutions">Solutions</FooterLink>
							<FooterLink href="https://www.lumos.exchange/coming-soon/investing" target="_blank" alt="Investing">Investing</FooterLink>
							<FooterLink href="https://www.lumos.exchange/team" target="_blank" alt="Team">Team</FooterLink>
							<FooterLink href="https://www.lumos.exchange/careers" target="_blank" alt="Careers">Careers</FooterLink>
							<FooterLink href="https://www.lumos.exchange/contact" target="_blank" alt="Contact">Contact</FooterLink>
						</div>
						<div className="col-4 col-sm-3 col-md-2 d-flex flex-column">
							<div className="spacer" />
							<FooterLink href="https://www.lumos.exchange/coming-soon/nfts" target="_blank" alt="NFTs">NFTs</FooterLink>
							<FooterLink href="https://www.lumos.exchange/partners" target="_blank" alt="Partners">Partners</FooterLink>
							<FooterLink href="https://library.lumos.exchange/" target="_blank" alt="Library">Library</FooterLink>
							<FooterLink href="https://library.lumos.exchange/view-roadmap" target="_blank" alt="Roadmap">Roadmap</FooterLink>
							<FooterLink href="https://library.lumos.exchange/view-greenmap" target="_blank" alt="Greenmap">Greenmap</FooterLink>
							<FooterLink href="https://www.lumos.exchange/coming-soon/whitepaper" target="_blank" alt="Whitepaper">Whitepaper</FooterLink>
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
