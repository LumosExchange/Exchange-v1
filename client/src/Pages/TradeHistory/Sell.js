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
import { ActiveTradeCard } from "../../Components/TradeCard";
import { LoadingState } from "../../Components/Profile";
import PrimaryButton from "../../Components/Buttons";
import { AppUrl } from "../../App";
import {
	MissingIcon,
	TradeHistoryTabs,
	ContentTab,
	MaxHeightBarrier,
} from '../../Components/TradeComponents';

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
