import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FormBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton from "../Components/Button";
import PhantomIcon from '../Images/phantom-icon-purple.svg';
import SolflareIcon from '../Images/solflare-icon.svg';
import ExodusIcon from '../Images/exodus-icon.svg';

const StyledLink = styled.a(({ theme }) => css`
	color: ${theme.colors.yellow};
	text-decoration: none;
	&:hover, &:focus, &:active {
		color: ${theme.colors.white};
		text-decoration: underline;	
	}
`);

const Test2 = styled.span(({ theme }) => css`
	background: ${theme.colors.darkerGrey};
	border-radius: 10px;
`);

const StyledRadio = styled.input(({ theme }) => css`
	display: none;

	&:checked + div {
		background: -webkit-linear-gradient(300deg, #FCE608, #FF7586, #B372CE, #6F86FF);
		border-radius: 10px;
		padding: 2px 4px 4px 2px;
	}
`);

const ConnectToggle = ({ id, image, wallet, className, onClick }) => (
	<div className={className} onClick={onClick}>
		<label htmlFor={id}>
			<StyledRadio id={id} type="radio" name="walletSelection" />
			<div>
				<Test2 className="d-flex p-4 flex-column">
					<img src={image} alt={wallet} className="pb-3 m-auto" style={{ width: '70px' }} />
					<Heading size="24px">{wallet}</Heading>
				</Test2>
			</div>
		</label>
	</div>
);


const Login = () => {
  const [selectedWallet, selectWallet] = useState("");

  console.log('selected wallet is', selectedWallet);

  return (
		<FormBody className="d-flex align-items-center justify-content-center py-5 container-fluid flex-column">
			<Heading className="pb-4">Connect Using a SQL Wallet</Heading>
			<Heading size="24px">
				We recommend using one of the SOL wallet for the best experience.
			</Heading>
				<div className="col-12 col-md-6 col-xl-5 col-xxl-4 p-5">
					<div className="d-flex">
						<ConnectToggle
							wallet="Phantom"
							image={PhantomIcon}
							onClick={ () => selectWallet('phantom') }
						/>
						<ConnectToggle
							wallet="Solflare"
							image={SolflareIcon}
							onClick={
								() => selectWallet('solflare')
							}
							className="mx-4"
						/>
						<ConnectToggle
							wallet="Exodus"
							image={ExodusIcon}
							onClick={ () => selectWallet('exodus') }
						/>
					</div>
					{selectedWallet === 'phantom' && (
						<Paragraph size="18px" className="mt-4">
							<StyledLink
								href="https://phantom.app"
								alt="Phantom"
								target="_blank"
							>
								Phantom
							</StyledLink> is a friendly non-custodial, browser extension, Solana wallet that makes it safe & easy for you to store, send, receive, collect, and swap tokens.
						</Paragraph>
					)}
					{selectedWallet === 'solflare' && (
						<Paragraph size="18px" className="mt-4">
							<StyledLink
								href="https://solflare.com"
								alt="Solflare"
								target="_blank"
							>
								Solflare
							</StyledLink> is a friendly non-custodial, browser extension, Solana wallet that makes it safe & easy for you to store, send, receive, collect, and swap tokens.
						</Paragraph>
					)}
					{selectedWallet === 'exodus' && (
						<Paragraph size="18px" className="mt-4">
							<StyledLink
								href="https://www.exodus.com/"
								alt="Exodus"
								target="_blank"
							>
								Exodus
							</StyledLink> is a friendly non-custodial, browser extension, Solana wallet that makes it safe & easy for you to store, send, receive, collect, and swap tokens.
						</Paragraph>
					)}
					<div className="d-flex flex-column m-auto">
						<div className="d-flex">
							<PrimaryButton
								text="Skip this step"
								color="grey"
								textColor="white"
								className="m-auto mt-3"
								onClick={null}
								type="logIn"
								form="nameform"
								value="logIn"
							/>
							<PrimaryButton
								text="Log In"
								className="m-auto mt-3"
								onClick={null}
								type="logIn"
								form="nameform"
								value="logIn"
								hasIcon
							/>
						</div>
					</div>
				</div>
    	</FormBody>
  );
}

export default Login;
