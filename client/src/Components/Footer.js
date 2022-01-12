import React from "react";
import styled, { css } from "styled-components";
import Heading from "./Heading";

const FooterBase = styled.footer(({ theme }) => css`
	background: ${theme.colors.black};
	border-top: 1px solid ${theme.colors.grey};

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
			<div className="row">
				<div className="col-12 d-flex flex-column">
					<Heading size="20px" bold>Sitemap</Heading>
					<div className="row">
						<div className="col-6 col-sm-3 d-flex flex-column">
							<a href="/About" alt="About">About</a>
							<a href="/About" alt="About">Solutions</a>
							<a href="/About" alt="About">Investing</a>
							<a href="/About" alt="About">Team</a>
							<a href="/About" alt="About">Careers</a>
							<a href="/About" alt="About">Contact</a>
						</div>
						<div className="col-6 col-sm-3 d-flex flex-column">
							<a href="/About" alt="About">NFTs</a>
							<a href="/About" alt="About">Partners</a>
							<a href="/About" alt="About">Library</a>
							<a href="/About" alt="About">Roadmap</a>
							<a href="/About" alt="About">Greenmap</a>
							<a href="/About" alt="About">Whitepaper</a>
						</div>
						<div className="col-12 col-sm-3 d-flex flex-column pt-5">
							<Heading size="20px" bold>Legal</Heading>
							<a href="/About" alt="About">About</a>
						</div>
						<div className="col-4 d-flex flex-column">
							<Heading size="20px" bold>Subscribe to our newsletter</Heading>
							<a href="/About" alt="About">About</a>
						</div>
					</div>
				</div>
			</div>
		</div>
    </FooterBase>
);

export default Footer;
