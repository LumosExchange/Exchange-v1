import React from "react";
import styled, { css } from "styled-components";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

const FooterBase = styled.footer(({ theme }) => css`
	background: ${theme.colors.black};
	border-top: 1px solid ${theme.colors.grey};

	p {
		font-size: 14px;
		
		@media screen and (min-width: ${theme.breakpoints.sm}){
			font-size: 18px;
		}
	}
	a {
		color: ${theme.colors.blueGrey};
		font-size: 14px;
		padding: 5px 0;
		text-decoration: none;

		&:hover {
			color: ${theme.colors.yellow};
		}

		@media screen and (min-width: ${theme.breakpoints.sm}){
			font-size: 18px;
		}
	}
`);

const Footer = () => (
    <FooterBase>
		<div className="container-fluid py-5">
				<div className="col-12 d-flex flex-column">
					<div className="row">
						<div className="col-6 col-sm-3 d-flex flex-column mb-5 mb-md-0">
							<Heading size="20px" bold>Sitemap</Heading>
							<a href="/About" alt="About">About</a>
							<a href="/Solutions" alt="Solutions">Solutions</a>
							<a href="/Investing" alt="Investing">Investing</a>
							<a href="/Team" alt="Team">Team</a>
							<a href="/Careers" alt="Careers">Careers</a>
							<a href="/Contract" alt="Contract">Contact</a>
						</div>
						<div className="col-6 col-sm-3 d-flex flex-column">
							<a href="/NFTs" alt="NFTs">NFTs</a>
							<a href="/Partners" alt="Partners">Partners</a>
							<a href="/Library" alt="Library">Library</a>
							<a href="/Roadmap" alt="Roadmap">Roadmap</a>
							<a href="/Greenmap" alt="Greenmap">Greenmap</a>
							<a href="/Whitepaper" alt="Whitepaper">Whitepaper</a>
						</div>
						<div className="col-12 col-sm-3 d-flex flex-column mb-5 mb-md-0">
							<Heading size="20px" bold>Legal</Heading>
							<a href="/Terms" alt="Terms">Our Terms</a>
							<a href="/Privacy" alt="Privacy">Your Privacy</a>
						</div>
						<div className="col-12 col-sm-3 d-flex flex-column">
							<Heading size="20px" bold>Subscribe to our newsletter</Heading>
							<Paragraph size="18px" color="blueGrey">Get regular project updates and access to new events on Discord, Twitter or in the real world.</Paragraph>
						</div>
					</div>
				</div>
		</div>
    </FooterBase>
);

export default Footer;
