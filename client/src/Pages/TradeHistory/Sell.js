import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PageBody, StyledLabel, StyledDropdown } from "../../Components/FormInputs";
import Heading from "../../Components/Heading";
import { Collapse } from "@material-ui/core";
import StyledTable from "../../Components/Tables";
import { InvisibleButton } from "../../Components/Buttons";
import { ToggleIcon } from "../MyWallet";
import Paragraph from "../../Components/Paragraph";
import Card from "../../Components/Card";
import { convertCurrencyToSymbol } from "../../Helpers";
import GradientButton from "../../Components/GradientButton";
import { convertAssetToSvg } from "../Buy";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import { CardDivider } from "../../Components/TradeCard";
import { LoadingState } from "../../Components/Profile";
import PrimaryButton from "../../Components/Buttons";
import { AppUrl } from "../../App";
import {
	TitledIcon,
	Reference,
	ActionButton,
	MissingIcon,
	TradeHistoryTabs,
	ContentTab,
	MaxHeightBarrier,
} from '../../Components/TradeComponents';

const ActiveTradeCard = ({ tradeInfo, type, noButtons, noMessage }) => {
	const [message, setMessage] = useState("");
	const formattedDate = tradeInfo.Date.replace("T", " at ").replace(".000Z", " ");
	const formattedCurrencySymbol = convertCurrencyToSymbol(tradeInfo.paymentCurrency);
	const liveTradeID = tradeInfo.LiveTradeID;
	const paymentSent = tradeInfo.paymentRecieved;

	const navigate = useNavigate();

	return (
		<Card className="w-100 p-4 mb-3" color="grey" key={tradeInfo.Reference}>
			<div className="row">
				<div className="col-12 col-lg-3">
					<div className="d-flex flex-column">
						<Heading bold size="22px" className="text-start mb-3">
							MetaData
						</Heading>
						<div className="d-flex">
							<TitledIcon className="material-icons me-2" title="Reference">
								tag
							</TitledIcon>
							<Paragraph size="18px" className="mb-2">
								{tradeInfo.HistoryID ? tradeInfo.HistoryID : tradeInfo.LiveTradeID}
							</Paragraph>
						</div>
						<div className="d-flex">
							<TitledIcon className="material-icons me-2" title="Date/Time Created">
								schedule
							</TitledIcon>
							<Paragraph size="18px" className="mb-2">
								{formattedDate}
							</Paragraph>
						</div>
						{!noMessage && tradeInfo.Message && (
							<div className="d-flex">
								<TitledIcon className="material-icons me-2" title="Message from Seller">
									message
								</TitledIcon>
								<Paragraph size="18px" className="mb-0 overflow-hidden text-truncate">
									{tradeInfo.Message}
								</Paragraph>
							</div>
						)}
					</div>
				</div>
				<div className="col-12 d-lg-none">
					<CardDivider />
				</div>
				<div className="col-12 col-lg-3">
					<Heading bold size="22px" className="text-start mb-3">
						Price/Coin Data
					</Heading>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Rate:
						</Paragraph>
						<Paragraph size="18px" className="mb-0">
							{formattedCurrencySymbol}
							{tradeInfo.userSolPrice} per SOL
						</Paragraph>
					</div>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Amount:
						</Paragraph>
						<Paragraph size="18px" className="mb-2">
							{tradeInfo.amountOfSol}
						</Paragraph>
					</div>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Total:
						</Paragraph>
						<Paragraph size="18px" className="mb-0">
							{formattedCurrencySymbol}
							{tradeInfo.fiatAmount}
						</Paragraph>
					</div>
				</div>
				<div className="col-12 d-lg-none">
					<CardDivider />
				</div>
				<div className="col-12 col-lg-3 mb-4 mb-md-0">
					<Heading bold size="22px" className="text-start mb-3">
						Payment Data
					</Heading>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Method:
						</Paragraph>
						<Paragraph size="18px" className="mb-2">
							{tradeInfo.paymentMethod}
						</Paragraph>
					</div>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Payment:
						</Paragraph>
						<Paragraph size="18px" className="mb-2">
							{tradeInfo.paymentRecieved === "NO" ? "Not yet paid" : "Mark as Paid"}
						</Paragraph>
					</div>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Ref:
						</Paragraph>
						<Reference size="18px" className="mb-2">
							{tradeInfo.Reference}
						</Reference>
					</div>
				</div>
				<div className="col-12 col-lg-3 d-flex align-items-end justify-content-end flex-column">
					<ActionButton
						className="w-100 mb-2"
						fontSize="20px"
						color="primary_cta"
						textColor="actual_white"
						disabled={noButtons}
						onClick={() =>
							navigate(type === "buying" ? "/Buying" : "/Selling", {
								state: {
									liveTradeID,
									paymentSent,
								},
							})
						}
					>
						View Trade
					</ActionButton>
				</div>
			</div>
		</Card>
	);
};

const TradeHistorySell = () => {
	// Collapse Sections
	const [messageForSales, setMessageForSales] = useState("");
	const [liveTradesSeller, setLiveTradesSeller] = useState([]);
	const [isLoading, setIsLoading] = useState("");

	const navigate = useNavigate();

	const getLiveTradesSeller = () => {
		setIsLoading(true);
		Axios.post(`${AppUrl}/GetLiveTradesSeller`).then((response) => {
			if (response.data.message) {
				setMessageForSales(response.data.message);
				setIsLoading(false);
			} else {
				setLiveTradesSeller(response.data);
				setIsLoading(false);
			}
		});
	};

	useEffect(() => {
		if (liveTradesSeller.length === 0) {
			getLiveTradesSeller();
		}

	}, [liveTradesSeller]);

	return (
		<PageBody
			className={`d-flex flex-column ${
				liveTradesSeller.length === 0
					? "justify-content-center"
					: "justify-content-start py-5"
			}`}
		>
			<div className="container text-center">
				{liveTradesSeller.length === 0 && (
					<div className="d-flex align-items-center justify-content-center flex-column">
						<MissingIcon className="material-icons mb-3">manage_search</MissingIcon>
						<Heading bold size="24px" className="mb-4">
							No Trades Found
						</Heading>
						<PrimaryButton text="Start Trading" onClick={() => navigate("/Sell")} />
					</div>
				)}
				{isLoading && <LoadingState />}
				<TradeHistoryTabs selected="Sell" />
				<ContentTab>
					{liveTradesSeller.length > 0 && (
						<div className="d-flex justify-content-center pt-4 pb-3 flex-column">
							<Heading size="24px" className="mb-4 text-start ms-3" bold>
								{liveTradesSeller.length} Active Sell Trade{liveTradesSeller.length > 1 && 's'}
							</Heading>
							<MaxHeightBarrier>
								{liveTradesSeller.map((tradeInfo, index) => (
									<ActiveTradeCard tradeInfo={tradeInfo} type="selling" key={index} />
								))}
								{messageForSales && (
									<Paragraph size="20px" className="ms-2">
										{messageForSales}
									</Paragraph>
								)}
							</MaxHeightBarrier>
						</div>
					)}
				</ContentTab>
			</div>
		</PageBody>
	);
};

export default TradeHistorySell;
