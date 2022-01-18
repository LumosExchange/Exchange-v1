import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FormBody, FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton from "../Components/Button";
import Link from "../Components/Link";
import Card from "../Components/Card";
import GradientButton from "../Components/GradientButton";
import { Collapse } from "@material-ui/core";
import SolanaIcon from '../Images/icon-solana.svg';
import DropdownIcon from '../Images/icon-dropdown.svg';

const InvisibleButton = styled.button(({ theme }) => css`
	background: none;
	border: 0;
`);

const ToggleIcon = styled.img(({ theme, toggled }) => css`
	transform: ${toggled && 'rotate(180deg)'};
`);

const GradientCard = styled.div(({ theme, stop1, stop2, stop3, stop4 }) => css`
	border-radius: 20px;
	background: linear-gradient(90deg,
			${theme.colors.gradients[stop1]} 0%,
			${theme.colors.gradients[stop2]} 100%
		);

	img {
		width: 100%;
		max-width: 90px;

		&.inline {
			width: 28px;
			min-width: 28px;
			min-height: 28px;
		}
	}
`);

const Login = () => {
  const [walletExpanded, expandWallet] = useState(false);

  console.log('selected wallet is', walletExpanded);

  const handleChange = () => {
    expandWallet((prev) => !prev);
  };

  return (
		<FormBody className="d-flex align-items-center">
			<div className="container d-flex align-items-center justify-content-center py-5 flex-column">
				<div className="row w-100">
					<div className="col-12 col-md-8">
						<div className="flex-column">
							<Heading className="pb-3">Your Wallet</Heading>
							<Paragraph size="18px" bold>
								Manage your credits, and grab a chance to earn with our reward pool.
							</Paragraph>
						</div>
					</div>
					<div className="col-12 col-md-4">
						<Card className="p-4 flex-column">
							<Heading size="24px" color="lightGrey">Reward Pool</Heading>
							<div className="d-flex justify-content-between align-items-center">
								<Heading size="28px" color="white" className="mb-0">0.05 SOL</Heading>
								<GradientButton text="Claim" fontSize="20px" />
							</div>
						</Card>
					</div>
				</div>
				<div className="row w-100 d-flex justify-content-center pt-5">
					<div className="col-12">
						<GradientCard stop1="sage" stop2="magenta" className="d-flex p-4">
							<div className="col-lg-2 d-none d-lg-flex justify-content-center">
								<img src={SolanaIcon} alt="Solana Icon" />
							</div>
							<div className="col-9 col-lg-9 d-flex flex-column">
								<div className="d-flex">
									<img src={SolanaIcon} alt="Solana Icon" className="inline me-2 d-md-none" />
									<Heading size="36px" bold>Solana</Heading>
								</div>

								<Heading size="36px" bold>11,000 SOL</Heading>
								<Paragraph size="18px" className="mb-0 text-break">
									383196VqKiMLqS74qZtA4U1DEzEQgpH6P3
								</Paragraph>
							</div>
							<div className="col-3 col-lg-2 d-flex">
								<InvisibleButton onClick={handleChange}>
									<ToggleIcon src={DropdownIcon} toggled={walletExpanded} alt="Dropdown" className="w-100" />
								</InvisibleButton>
							</div>
						</GradientCard>
					</div>
				</div>
				<div className="row w-100">
					<Collapse orientation="horizontal" in={walletExpanded}>
						<Card className="d-flex flex-column p-4 flex-wrap">
							<div className="row d-flex justify-content-center align-items-end">
								<div className="col-12 col-md-6">
									<Heading size="24px">Send</Heading>
									<Paragraph size="18px">To address</Paragraph>
									<FormInput color="six9Grey" padding="3px 10px" className="w-100" />
								</div>
								<div className="col-12 col-md-6 d-flex flex-column mt-3 mt-md-0">
									<Paragraph size="18px">Amount (SOL)</Paragraph>
									<FormInput color="six9Grey" padding="3px 10px" className="w-100" />
								</div>
								<div className="col-11 d-flex px-5 justify-content-end align-items-start pt-5">
									<PrimaryButton
										text="Check"
										color="brightGrey"
										textColor="grey"
										hasIcon
										round
										className="me-5"
										size="sm"
										fontSize="26px"
									/>
									<PrimaryButton
										text="Send"
										color="yellow"
										textColor="grey"
										round
										size="sm"
										fontSize="26px"
									/>
								</div>
							</div>
						</Card>
					</Collapse>
				</div>
			</div>
    	</FormBody>
  );
}

export default Login;
