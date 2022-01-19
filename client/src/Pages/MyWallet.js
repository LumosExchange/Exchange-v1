import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FormBody, FormInput } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton from "../Components/Button";
import Link from "../Components/Link";
import Card from "../Components/Card";
import GradientButton from "../Components/GradientButton";
import GradientCard from "../Components/GradientCard";
import { Collapse } from "@material-ui/core";
import SolanaIcon from '../Images/icon-solana.svg';
import DropdownIcon from '../Images/icon-dropdown.svg';
import StyledTable from "../Components/Tables";

const InvisibleButton = styled.button`
	background: none;
	border: 0;
`;

const ToggleIcon = styled.img(({ toggled }) => css`
	transform: ${toggled && 'rotate(180deg)'};

	&.small {
		width: 40px;
		min-height: 40px;
		min-width: 40px;
	}
`);

const Divider = styled.hr(({ theme }) => css`
	background ${theme.colors.six9Grey};
	width: 100%;
	opacity: 1;
`);

const FakeTableData = [
	{
		'provider': 'shinji0314',
		'region': 'United Kingdom',
		'date': '16-07-2021 - 11:00:00',
		'type': 'Airdrop',
		'amount': 0.5,
		'currency': 'SOL',
	},
	{
		'provider': 'asuka',
		'region': 'Germany',
		'date': '15-07-2021 - 09:30:00',
		'type': 'Airdrop',
		'amount': 1,
		'currency': 'SOL',
	},
]

const Login = () => {
  const [walletExpanded, expandWallet] = useState(false);
  const [rewardsExpanded, expandRewards] = useState(false);

  return (
		<FormBody className="d-flex align-items-center">
			<div className="container d-flex align-items-center justify-content-center py-5 flex-column">
				<div className="row w-100">
					<div className="col-12 col-lg-8">
						<div className="flex-column">
							<Heading className="pb-3">Your Wallet</Heading>
							<Paragraph size="18px" bold>
								Manage your credits, and grab a chance to earn with our reward pool.
							</Paragraph>
						</div>
					</div>
					<div className="col-12 col-lg-4">
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
						<GradientCard
							stopOne="magenta"
							stopOnePosition={ 0 }
							stopTwo="sage"
							stopTwoPosition={ 100 }
							className="d-flex p-4"
						>
							<div className="col-0 col-lg-2 d-none d-lg-flex justify-content-center">
								<img src={SolanaIcon} alt="Solana Icon" />
							</div>
							<div className="col-9 col-lg-8 d-flex flex-column">
								<div className="d-flex">
									<img src={SolanaIcon} alt="Solana Icon" className="inline me-2 d-lg-none" />
									<Heading size="36px" bold className="mb-0">Solana</Heading>
								</div>
								<Heading size="36px" bold>11,000 SOL</Heading>
								<Paragraph size="18px" className="mb-0 text-break">
									383196VqKiMLqS74qZtA4U1DEzEQgpH6P3
								</Paragraph>
							</div>
							<div className="col-3 col-lg-2 d-flex justify-content-end">
								<InvisibleButton onClick={ () => expandWallet((prev) => !prev) }>
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
				<div className="row w-100 mt-4">
					<div className="col-12 col-lg-4">
						<GradientCard
							stops={ 5 }
							stopOne="yellow"
							stopTwo="peach"
							stopThree="pink"
							stopFour="mauve"
							stopFive="blue"
							padding="35px"
							className="d-flex align-items-center justify-content-center"
						>
							<Heading size="28px" className="mb-0">17,727 LRA</Heading>
						</GradientCard>
					</div>
					<div className="col-12 col-lg-4">
						<GradientCard
							padding="35px"
							stops={ 2 }
							stopOne="bluePurple"
							stopTwo="bluePurple"
							className="d-flex align-items-center justify-content-center"
						>
							<Heading size="28px" className="mb-0">2,500 KIN</Heading>
						</GradientCard>
					</div>
					<div className="col-12 col-lg-4">
						<GradientCard
							padding="35px"
							stops={ 2 }
							stopOne="bluePurple"
							stopTwo="bluePurple"
							className="d-flex align-items-center justify-content-center"
						>
							<Heading size="28px" className="mb-0">3,628 COPE</Heading>
						</GradientCard>
					</div>
				</div>
				<div className="row w-100 mt-4">
					<div className="col-12 d-flex flex-column">
						<Divider />
						<InvisibleButton
							onClick={ () => expandRewards((prev) => !prev)}
							className="d-flex align-items-center pt-2"
						>
							<Heading size="24px" color="white" className="mb-0">Reward History</Heading>
							<ToggleIcon src={DropdownIcon} toggled={rewardsExpanded} alt="Dropdown" className="small ms-3" />
						</InvisibleButton>
					</div>
					<Collapse orientation="horizontal" in={rewardsExpanded}>
						<StyledTable className="w-100 mt-4">
							<thead>
								<tr>
									<th>Provider</th>
									<th>Region</th>
									<th>Date</th>
									<th>Type</th>
									<th>Amount</th>
								</tr>
							</thead>
							<tbody>
								{FakeTableData.map((data, d) => (
									<tr key={d}>
										<td>
											<span>
												{data.provider}
											</span>
										</td>
										<td>{data.region}</td>
										<td>{data.date}</td>
										<td>{data.type}</td>
										<td>{data.amount} {data.currency}</td>
									</tr>
								))}
							</tbody>
						</StyledTable>
					</Collapse>
				</div>
			</div>
    	</FormBody>
  );
}

export default Login;
