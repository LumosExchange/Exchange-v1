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
import { useNavigate } from "react-router";
import { CardDivider } from "../Components/TradeCard";
import { LoadingState } from "../Components/Profile";
import PrimaryButton from "../Components/Buttons";

const Reference = styled(Paragraph)`text-transform: uppercase;`;
const TitledIcon = styled.i`cursor: help;`;

const MaxHeightBarrier = styled.div(({ theme }) => css`
	max-height: 750px;
	overflow: auto;
	padding-right: 10px;

	@media screen and (min-width: ${theme.breakpoints.md}){
		max-height: 590px;
	}
`);

const ActionButton = styled(InvisibleButton)(({ theme, color, textColor }) => css`
	background: ${theme.colors[color]};
	border-radius: 50px;
	padding: 10px 25px;
	color: ${theme.colors.base_bg};
	font-size: 20px;

	&.delete {
		background: ${theme.colors.invalid};
		color: ${theme.colors.actual_white};
	}

	&:hover {
		transform: scale(1.05);
	}

	&:disabled {
		background: ${theme.colors.disabledGrey};
		cursor: not-allowed;
		color: ${theme.colors.actual_white};

		&:hover {
			transform: initial;
		}
	}
`);

const MissingIcon = styled.i(({ theme }) => css`
	font-size: 80px;
	color: ${theme.colors.primary_cta};
`);

const ActiveTradeCard = ({ tradeInfo, type, noButtons, noMessage }) => {
	const [message, setMessage] = useState('');
	const formattedDate = tradeInfo.Date.replace('T', ' at ').replace('.000Z', ' ');
	const formattedCurrencySymbol = convertCurrencyToSymbol(tradeInfo.paymentCurrency);
	const liveTradeID = tradeInfo.LiveTradeID;
	const paymentSent = tradeInfo.paymentRecieved;

	const navigate = useNavigate();

	const deleteLiveTrade = ({ liveTradeID }) => {
		Axios.post("http://localhost:3001/DeleteLiveTrade", {
			liveTradeID,
		}).then((response) => {
			setMessage(response.data.message);
		});
	}

	return (
		<Card className="w-100 p-4 mb-3" color="grey" key={tradeInfo.Reference}>
			<div className="row">
				<div className="col-12 col-lg-3">
					<div className="d-flex flex-column">
						<Heading bold size="20px">MetaData</Heading>
						<div className="d-flex">
							<TitledIcon className="material-icons me-2" title="Reference">tag</TitledIcon>
							<Paragraph size="18px" className="mb-2">{tradeInfo.HistoryID ? tradeInfo.HistoryID : tradeInfo.LiveTradeID}</Paragraph>
						</div>
						<div className="d-flex">
							<TitledIcon className="material-icons me-2" title="Date/Time Created">schedule</TitledIcon>
							<Paragraph size="18px" className="mb-2">{formattedDate}</Paragraph>
						</div>
						{!noMessage && tradeInfo.Message && (
							<div className="d-flex">
								<TitledIcon className="material-icons me-2" title="Message from Seller">message</TitledIcon>
								<Paragraph size="18px" className="mb-0 overflow-hidden text-truncate">{tradeInfo.Message}</Paragraph>
							</div>
						)}
					</div>
				</div>
				<div className="col-12 d-lg-none">
					<CardDivider />
				</div>
				<div className="col-12 col-lg-3">
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
						<Paragraph size="18px" className="mb-0">{formattedCurrencySymbol}{tradeInfo.fiatAmount}</Paragraph>
					</div>
				</div>
				<div className="col-12 d-lg-none">
					<CardDivider />
				</div>
				<div className="col-12 col-lg-3 mb-4 mb-md-0">
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
				<div className="col-12 col-lg-3 d-flex align-items-end justify-content-end flex-column">
					<ActionButton
						fontSize="20px"
						className="mb-3 w-100 delete"
						disabled={noButtons}
						onClick={ () => deleteLiveTrade() }
					>
						Delete Trade
					</ActionButton>
					<ActionButton
						className="w-100 mb-2"
						fontSize="20px"
						color="primary_cta"
						textColor="actual_white"
						disabled={noButtons}
						onClick={ () => navigate(type === "buying" ? "/Buying" : "/Selling", {
							state: {
								liveTradeID,
								paymentSent,
							}
						})}
					>
						View Trade
					</ActionButton>
				</div>
			</div>
		</Card>
	);
}

const TradeHistory = () => {
	// Collapse Sections
	const [historyExpanded, expandHistory] = useState(false);
	const [activeBuyTradesExpanded, expandActiveBuyTrades] = useState(false);
	const [activeSellTradesExpanded, expandActiveSellTrades] = useState(false);
	const [messageForSales, setMessageForSales] = useState('');
	const [messageForHistory, setMessageForHistory] = useState('');
	const [messageForPurchases, setMessageForPurchases] = useState('');
	const [liveTradesBuyer, setLiveTradesBuyer] = useState([]);
	const [liveTradesSeller, setLiveTradesSeller] = useState([]);
	const [isLoadingBuyTrades, setIsLoadingBuyTrades] = useState(true);
	const [isLoadingSellTrades, setIsLoadingSellTrades] = useState(true);
	const [isLoadingTradeHistory, setIsLoadingTradeHistory] = useState(true);
	const [tradeHistory, setTradeHistory] = useState([]);

	const navigate = useNavigate();

	const getLiveTradesBuyer = () => {
		Axios.post("http://localhost:3001/GetLiveTradesBuyer").then((response) => {
			if (response.data.message){
				setMessageForPurchases(response.data.message);
				setIsLoadingBuyTrades(false);
			} else {
				setLiveTradesBuyer(response.data);
				setIsLoadingBuyTrades(false);
				expandActiveBuyTrades(true);
			}
		}
	)}

	const getLiveTradesSeller = () => {
		Axios.post("http://localhost:3001/GetLiveTradesSeller").then((response) => {
			if (response.data.message){
				setMessageForSales(response.data.message);
				setIsLoadingSellTrades(false);
			} else {
				setLiveTradesSeller(response.data);
				setIsLoadingSellTrades(false);
				expandActiveSellTrades(true);
			}
		}
	)}

	const getTradeHistory = () => {
		Axios.post("http://localhost:3001/TradeHistory").then((response) => {
			if (response.data.message){
				setMessageForHistory(response.data.message);
				setIsLoadingTradeHistory(false);
			} else {
				setTradeHistory(response.data);
				setIsLoadingTradeHistory(false);
				expandHistory(true);
			}
		});
	}

	useEffect(() => {
		if (liveTradesBuyer.length === 0){
			getLiveTradesBuyer();
		}
		if (liveTradesSeller.length === 0){
			getLiveTradesSeller();
		}

		getTradeHistory();

	}, [liveTradesBuyer, liveTradesSeller]);

	console.log(tradeHistory, 'trade history');

	return (
		<PageBody className="d-flex justify-content-center flex-column">
			<div className="container text-center">
				{liveTradesBuyer.length === 0 && liveTradesSeller.length === 0  && tradeHistory.length === 0  && (
					<div className="d-flex align-items-center justify-content-center flex-column">
						<MissingIcon className="material-icons mb-3">manage_search</MissingIcon>
						<Heading bold size="24px" className="mb-4">No Trades Found</Heading>
						<PrimaryButton text="Start Trading" onClick={ () => navigate('/Buy') } />
					</div>
				)}
				<div className="d-flex justify-content-center">
					{(isLoadingSellTrades || isLoadingBuyTrades) && <LoadingState />}
				</div>
				<div className="d-flex justify-content-center">
					{(isLoadingSellTrades || isLoadingBuyTrades) && <LoadingState />}
				</div>
				{liveTradesBuyer.length > 0 && (
					<div className="d-flex justify-content-center pt-5 pb-3 flex-column">
						<InvisibleButton
							onClick={ () => expandActiveBuyTrades((prev) => !prev)}
							className="d-flex align-items-center pt-2"
						>
							<ToggleIcon toggled={activeBuyTradesExpanded} alt="Dropdown" className="small me-3" />
							<Heading size="24px" className="mb-0">{liveTradesBuyer.length} Active Buy Trades</Heading>
						</InvisibleButton>
						<MaxHeightBarrier>
							<Collapse orientation="horizontal" in={activeBuyTradesExpanded}>
								{liveTradesBuyer.map((tradeInfo) => (
									<React.Fragment>
									<ActiveTradeCard tradeInfo={tradeInfo} type="buying" />
									</React.Fragment>
								))}
								{messageForPurchases && <Paragraph size="20px" className="ms-2">{messageForPurchases}</Paragraph>}
							</Collapse>
						</MaxHeightBarrier>
					</div>
				)}
				{liveTradesSeller.length > 0 && (
					<div className="d-flex justify-content-center pt-5 pb-3 flex-column">
						<InvisibleButton
							onClick={ () => expandActiveSellTrades((prev) => !prev)}
							className="d-flex align-items-center pt-2"
						>
							<ToggleIcon toggled={activeSellTradesExpanded} alt="Dropdown" className="small me-3" />
							<Heading size="24px" className="mb-0">{liveTradesSeller.length} Active Sell Trades</Heading>
						</InvisibleButton>
						<MaxHeightBarrier>
							<Collapse orientation="horizontal" in={activeSellTradesExpanded}>
								{liveTradesSeller.map((tradeInfo) => (
									<ActiveTradeCard tradeInfo={tradeInfo} type="selling" />
								))}
								{messageForSales && <Paragraph size="20px" className="ms-2">{messageForSales}</Paragraph>}
							</Collapse>
						</MaxHeightBarrier>
					</div>
				)}
				{tradeHistory.length > 0 && (
					<div className="d-flex justify-content-center pt-5 pb-3 flex-column">
						<InvisibleButton
							onClick={ () => expandHistory((prev) => !prev)}
							className="d-flex align-items-center pt-2"
						>
							<ToggleIcon toggled={historyExpanded} alt="Dropdown" className="small me-3" />
							<Heading size="24px" className="mb-0">{tradeHistory.length} Completed Trades</Heading>
						</InvisibleButton>
						<MaxHeightBarrier>
							<Collapse orientation="horizontal" in={historyExpanded}>
								{tradeHistory.map((trades) => (
									<ActiveTradeCard tradeInfo={trades} noButtons noMessage />
								))}
								{messageForHistory && <Paragraph size="20px" className="ms-2">{messageForHistory}</Paragraph>}
							</Collapse>
						</MaxHeightBarrier>
					</div>
				)}
			</div>
		</PageBody>
	);
}

export default TradeHistory;
