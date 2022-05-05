import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { PageBody, FormInput, StyledDropdown } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton, { InvisibleButton } from "../Components/Buttons";
import Card from "../Components/Card";
import GradientButton from "../Components/GradientButton";
import GradientCard from "../Components/GradientCard";
import { Collapse } from "@material-ui/core";
import SolanaIcon from '../Images/icon-solana.svg';
import DropdownIcon from '../Images/icon-dropdown.svg';
import StyledTable from "../Components/Tables";
import { convertAssetToIcon } from '../Components/AirDrops';


const ToggleIconBase = styled.svg(({ toggled, theme }) => css`
	transform: ${toggled && 'rotate(180deg)'};

	&.small {
		width: 40px;
		min-height: 40px;
		min-width: 40px;
	}

	circle, path {
		stroke: ${theme.colors.text_primary};
	}
`);

export const ToggleIcon = ({ className, toggled }) => (
	<ToggleIconBase
		width="71"
		height="71"
		viewBox="0 0 71 71" fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		toggled={toggled}
	>
		<circle cx="35.5" cy="35.5" r="34" strokeWidth="3"/>
		<path d="M25.5 33L36.5 44L47.5 33" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
	</ToggleIconBase>
);

const Divider = styled.hr(({ theme }) => css`
	background ${theme.colors.secondary_link};
	width: 100%;
	opacity: 1;
`);

const RewardPools = [
	{
		'currency': 'SOL',
		'amount': '5',
	},
	{
		'currency': 'LRA',
		'amount': '100',
	},
	{
		'currency': 'COPE',
		'amount': '12',
	},
];

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
	{
		'provider': 'johnsmith05',
		'region': 'United Kingdom',
		'date': '15-07-2021 - 09:30:00',
		'type': 'Airdrop',
		'amount': 1,
		'currency': 'COPE',
	},
	{
		'provider': 'user4578',
		'region': 'Spain',
		'date': '15-07-2021 - 09:30:00',
		'type': 'Airdrop',
		'amount': 1,
		'currency': 'LRA',
	},
];

const IconContainer = styled.div(({ theme }) => css`
	img, svg {
		width: 100%;
		height: 117px;
	}
`);

const pubKey="GAECQos3deHaqzB1EDvPJcqaGVvG9xqDuFYU239KAsXV";

const MyWallet = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("SOL");

  return (
		<PageBody className="d-flex align-items-start pt-5">
			<div className="container d-flex align-items-center justify-content-center py-5 flex-column">
				<div className="row w-100">
					<div className="col-12">
						<div className="flex-column">
							<Heading className="pb-3">Your Wallet</Heading>
							<Paragraph size="18px" bold>
								Manage your credits, and grab a chance to earn with our reward pool.
							</Paragraph>
						</div>
					</div>
					<div className="col-12 col-lg-6">
						<Card className="p-4 flex-column">
							<Heading size="24px" color="text_primary" bold>Overview</Heading>
							<div className="d-flex justify-content-between align-items-center">
								<StyledDropdown
									className="w-100"
									placeholder="Please Select"
									name="preferredPayment"
									value={selectedCrypto}
									id="preferredPayment"
									onChange={(e) => {
										setSelectedCrypto(e.target.value);
									}}
								>
									<option value="SOL">Solana (SOL)</option>
									<option value="LRA">Lumos Rewards (LRA)</option>
									<option value="COPE">COPE (COPE)</option>
								</StyledDropdown>
							</div>
						</Card>
					</div>
					<div className="col-12 col-lg-6">
						<Card className="p-4 flex-column">
							<Heading size="24px" color="text_primary" bold>Reward Pool</Heading>
							<div className="d-flex justify-content-between align-items-center">
								<Heading size="28px" className="mb-0">{RewardPools.filter(rp => rp.currency === selectedCrypto).map(rp => rp.amount)} {selectedCrypto}</Heading>
								<GradientButton text="Claim" fontSize="20px" />
							</div>
						</Card>
					</div>
				</div>
				<div className="row w-100 mt-4">
					<div className="col-12 d-flex flex-column">
						<Divider />
						<Heading size="24px" className="mb-0 pt-4">Reward History</Heading>
					</div>
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
							{selectedCrypto && FakeTableData.filter(fd => fd.currency === selectedCrypto).map((data, d) => (
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
				</div>
			</div>
    	</PageBody>
  );
}

export default MyWallet;
