import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PageBody, StyledLabel, StyledDropdown } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import { Collapse } from "@material-ui/core";
import StyledTable from "../Components/Tables";
import { InvisibleButton } from "../Components/Buttons";
import { ToggleIcon } from "./MyWallet";
import Paragraph from "../Components/Paragraph";
import Card from '../Components/Card';
import { convertCurrencyToSymbol } from '../Helpers'
import GradientButton from "../Components/GradientButton";
import { convertAssetToSvg } from '../Pages/Buy';
import styled, { css } from 'styled-components';

const FakeTableData = [
	{
		'user': 'shinji0314',
		'region': 'United Kingdom',
		'date': '16-07-2021 - 11:00:00',
		'type': 'Airdrop',
		'amount': 0.5,
		'currency': 'SOL',
		'total': '100',
		'status': 'completed',
	},
]

const Reference = styled(Paragraph)`
	text-transform: uppercase;
`;

const TitledIcon = styled.i`
	cursor: help;
`;

const ActiveTradeCard = ({ tradeInfo }) => {
	const formattedDate = tradeInfo.Date.replace('T', ' at ').replace('.000Z', ' ');
	const formattedCurrencySymbol = convertCurrencyToSymbol(tradeInfo.paymentCurrency);

	return (
		<Card className="w-100 p-4" color="grey">
			<div className="row">
				<div className="col-3">
					<div className="d-flex flex-column">
						<Heading bold size="20px">MetaData</Heading>
						<div className="d-flex">
							<TitledIcon className="material-icons me-2" title="Reference">tag</TitledIcon>
							<Paragraph size="18px" className="mb-2">{tradeInfo.LiveTradeID}</Paragraph>
						</div>
						<div className="d-flex">
							<TitledIcon className="material-icons me-2" title="Date/Time Created">schedule</TitledIcon>
							<Paragraph size="18px" className="mb-2">{formattedDate}</Paragraph>
						</div>
						{tradeInfo.Message && (
							<div className="d-flex">
								<TitledIcon className="material-icons me-2" title="Message from Seller">message</TitledIcon>
								<Paragraph size="18px" className="mb-2">{tradeInfo.Message}</Paragraph>
							</div>
						)}
					</div>
				</div>
				<div className="col-3">
					<Heading bold size="20px">Price/Coin Data</Heading>
					<div className="d-flex">
						<TitledIcon className="me-2" title="Price per SOL">{convertAssetToSvg('SOL')}</TitledIcon>
						<Paragraph size="18px" className="mb-2">{formattedCurrencySymbol}{tradeInfo.userSolPrice} per SOL</Paragraph>
					</div>
					<div className="d-flex">
						<TitledIcon className="me-2" title="Quantity Requested">{convertAssetToSvg('SOL')}</TitledIcon>
						<Paragraph size="18px" className="mb-2">{tradeInfo.amountOfSol}</Paragraph>
					</div>
					<div className="d-flex">
						<TitledIcon className="material-icons me-2" title="Amount in FIAT">paid</TitledIcon>
						<Paragraph size="18px" className="mb-2">{formattedCurrencySymbol}{tradeInfo.fiatAmount}</Paragraph>
					</div>
				</div>
				<div className="col-3">
					<Heading bold size="20px">Payment Data</Heading>
					<div className="d-flex">
						<TitledIcon className="material-icons me-2" title="Payment Method">account_balance_wallet</TitledIcon>
						<Paragraph size="18px" className="mb-2">{tradeInfo.paymentMethod}</Paragraph>
					</div>
					<div className="d-flex">
						<TitledIcon className="material-icons me-2" title="Is Payment sent?">
							{tradeInfo.paymentRecieved === "NO" ? 'cancel' : 'check_circle'}
						</TitledIcon>
						<Paragraph size="18px" className="mb-2">
							{tradeInfo.paymentRecieved === "NO" ? 'Payment not sent' : 'Payment Sent'}
						</Paragraph>
					</div>
					<div className="d-flex">
						<TitledIcon className="material-icons me-2" title="Payment Reference">label</TitledIcon>
						<Reference size="18px" className="mb-2">{tradeInfo.Reference}</Reference>
					</div>
				</div>
				<div className="col-3 d-flex align-items-end justify-content-end">
					<GradientButton text="View this Trade" fontSize="20px" />
				</div>
			</div>
		</Card>
	);
}

const TradeHistory = () => {
	const [userListings, setUserListings] = useState([]);

	// Collapse Sections
	const [historyExpanded, expandHistory] = useState(false);
	const [activeBuyTradesExpanded, expandActiveBuyTrades] = useState(true);
	const [activeSellTradesExpanded, expandActiveSellTrades] = useState(true);
	const [messageForSales, setMessageForSales] = useState('');
	const [messageForPurchases, setMessageForPurchases] = useState('');
	const [liveTradesBuyer, setLiveTradesBuyer] = useState([]);
	const [liveTradesSeller, setLiveTradesSeller] = useState([]);

	const getLiveTradesBuyer = () => {
		Axios.post("http://localhost:3001/GetLiveTradesBuyer").then((response) => {
			if (response.data.message){
				setMessageForPurchases(response.data.message);
			} else {
				setLiveTradesBuyer(response.data);
			}
		}
	)}

	const getLiveTradesSeller = () => {
		Axios.post("http://localhost:3001/GetLiveTradesSeller").then((response) => {
			if (response.data.message){
				setMessageForSales(response.data.message);
			} else {
				setLiveTradesSeller(response.data);
			}
		}
	)}

	console.log(liveTradesBuyer, 'live trades buyer side');
	console.log(liveTradesSeller, 'live trades seller side');

	useEffect(() => {
		if(liveTradesBuyer.length === 0){
			getLiveTradesBuyer();
		}
		if(liveTradesSeller.length === 0){
			getLiveTradesSeller();
		}
	}, []);

	return (
			<PageBody className="d-flex align-items-start flex-column">
				<div className="container">
					<div className="d-flex justify-content-center pt-5 pb-3 flex-column">
						<InvisibleButton
							onClick={ () => expandActiveBuyTrades((prev) => !prev)}
							className="d-flex align-items-center pt-2"
						>
							<ToggleIcon toggled={activeBuyTradesExpanded} alt="Dropdown" className="small me-3" />
							<Heading size="24px" className="mb-0">Active Trades (Buying)</Heading>
						</InvisibleButton>
						<Collapse orientation="horizontal" in={activeBuyTradesExpanded}>
							{liveTradesBuyer.map((tradeInfo) => (
								<ActiveTradeCard tradeInfo={tradeInfo} />
							))}
							{messageForPurchases && <Paragraph size="20px">{messageForPurchases}</Paragraph>}
						</Collapse>
					</div>
					<div className="d-flex justify-content-center pt-5 pb-3 flex-column">
						<InvisibleButton
							onClick={ () => expandActiveSellTrades((prev) => !prev)}
							className="d-flex align-items-center pt-2"
						>
							<ToggleIcon toggled={activeSellTradesExpanded} alt="Dropdown" className="small me-3" />
							<Heading size="24px" className="mb-0">Active Trades (Selling)</Heading>
						</InvisibleButton>
						<Collapse orientation="horizontal" in={activeSellTradesExpanded}>
							Active Selling Trades Here
							{messageForSales && <Paragraph size="20px">{messageForSales}</Paragraph>}
						</Collapse>
					</div>
					<div className="d-flex justify-content-center pt-5 pb-3 flex-column">
						<InvisibleButton
							onClick={ () => expandHistory((prev) => !prev)}
							className="d-flex align-items-center pt-2"
						>
							<ToggleIcon toggled={historyExpanded} alt="Dropdown" className="small me-3" />
							<Heading size="24px" className="mb-0">Trade History</Heading>
						</InvisibleButton>
						<Collapse orientation="horizontal" in={historyExpanded}>
							Trade History Here
						</Collapse>
					</div>
				</div>
			</PageBody>
		);
}

export default TradeHistory;
