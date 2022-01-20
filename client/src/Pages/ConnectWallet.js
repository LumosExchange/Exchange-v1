import React, { useState } from "react";
import styled, { css } from "styled-components";
import { PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton from "../Components/Button";
import PhantomIcon from '../Images/phantom-icon-purple.svg';
import SolflareIcon from '../Images/solflare-icon.svg';
import ExodusIcon from '../Images/exodus-icon.svg';
import Link from "../Components/Link";

const WalletCard = styled.span(({ theme }) => css`
	background: ${theme.colors.darkerGrey};
	border-radius: 10px;
	cursor: pointer;
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
		<label htmlFor={id} className="w-100 text-center">
			<StyledRadio id={id} type="radio" name="walletSelection" />
			<div>
				<WalletCard className="d-flex p-4 flex-column">
					<img src={image} alt={wallet} className="pb-3 m-auto" style={{ width: '70px' }} />
					<Heading size="24px">{wallet}</Heading>
				</WalletCard>
			</div>
		</label>
	</div>
);


const Login = () => {
  const [selectedWallet, selectWallet] = useState("");

  console.log('selected wallet is', selectedWallet);

  return (
		<PageBody className="d-flex align-items-center">
			<div className="container d-flex align-items-center justify-content-center py-5 flex-column">
				<Heading className="pb-4 text-center">Connect Using a SQL Wallet</Heading>
				<Heading size="24px" className="text-center">
					We recommend using one of the SOL wallet for the best experience.
				</Heading>
					<div className="row p-5 d-flex justify-content-center w-100">
						<div className="col-12 col-sm-5 col-lg-4 col-xl-4 col-xxl-2">
							<ConnectToggle
								wallet="Phantom"
								image={PhantomIcon}
								onClick={ () => selectWallet('phantom') }
							/>
						</div>
						<div className="col-12 col-sm-5 col-lg-4 col-xl-4 col-xxl-2 my-3 my-sm-0">
							<ConnectToggle
								wallet="Solflare"
								image={SolflareIcon}
								onClick={ () => selectWallet('solflare') }
							/>
						</div>
						<div className="col-12 col-sm-5 col-lg-4 col-xl-4 col-xxl-2 mt-sm-3 mt-lg-0">
							<ConnectToggle
								wallet="Exodus"
								image={ExodusIcon}
								onClick={ () => selectWallet('exodus') }
							/>
						</div>
						<div className="col-12 col-lg-6 col-xl-8 d-flex mt-5">
						{selectedWallet === 'phantom' && (
							<Paragraph size="18px">
								<Link
									href="https://phantom.app"
									alt="Phantom"
									target="_blank"
								>
									Phantom
								</Link> is a friendly non-custodial, browser extension, Solana wallet that makes it safe & easy for you to store, send, receive, collect, and swap tokens.
							</Paragraph>
						)}
							{selectedWallet === 'solflare' && (
								<Paragraph size="18px">
									<Link
										href="https://solflare.com"
										alt="Solflare"
										target="_blank"
									>
										Solflare
									</Link> is a friendly non-custodial, browser extension, Solana wallet that makes it safe & easy for you to store, send, receive, collect, and swap tokens.
								</Paragraph>
							)}
							{selectedWallet === 'exodus' && (
								<Paragraph size="18px">
									<Link
										href="https://www.exodus.com/"
										alt="Exodus"
										target="_blank"
									>
										Exodus
									</Link> is a friendly non-custodial, browser extension, Solana wallet that makes it safe & easy for you to store, send, receive, collect, and swap tokens.
								</Paragraph>
							)}
						</div>
						</div>
						<div className="container row w-100 d-flex flex-column flex-md-row justify-content-center">
							<div className="col-12 col-md-4 col-lg-3 col-xl-3 d-flex justify-content-center justify-content-xl-end">
								<PrimaryButton
									text="Skip this step"
									color="grey"
									textColor="white"
									className="mt-3 w-100"
									onClick={null}
									type="logIn"
									form="nameform"
									value="logIn"
								/>
							</div>
							<div className="col-12 col-md-4 col-lg-3 col-xl-3 d-flex justify-content-center justify-content-xl-start">
								<PrimaryButton
									text="Log In"
									className="mt-3 w-100"
									onClick={null}
									type="logIn"
									form="nameform"
									value="logIn"
									hasIcon
								/>
							</div>
						</div>
					</div>
    	</PageBody>
  );
}

export default Login;
