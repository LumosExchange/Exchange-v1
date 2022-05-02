import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PageBody, StyledLabel, StyledDropdown } from "../../Components/FormInputs";
import Heading from "../../Components/Heading";
import Paragraph from "../../Components/Paragraph";
import { ActiveTradeCard } from "../../Components/TradeCard";
import { LoadingState } from "../../Components/Profile";
import { AppUrl } from "../../App";
import { TradeHistoryTabs, ContentTab, MaxHeightBarrier, MissingIcon } from "../../Components/TradeComponents";
import PrimaryButton from "../../Components/Buttons";
import { useNavigate } from "react-router";

const TradeHistoryCompleted = () => {
	// Collapse Sections
	const [messageForHistory, setMessageForHistory] = useState("");
	const [tradeHistory, setTradeHistory] = useState([]);
	const [isLoading, setIsLoading] = useState("");

	const navigate = useNavigate();

	const getTradeHistory = () => {
		setIsLoading(true);
		Axios.post(`${AppUrl}/TradeHistory`).then((response) => {
			if (response.data.message) {
				setMessageForHistory(response.data.message);
				setIsLoading(false);
			} else {
				setTradeHistory(response.data);
				setIsLoading(false);
			}
		});
	};

	useEffect(() => {
		getTradeHistory();
	}, []);

	return (
		<PageBody className="d-flex flex-column justify-content-start py-5">
			<div className="container text-center">
				{isLoading && <LoadingState />}
						<TradeHistoryTabs selected="Completed" />
						<ContentTab>
						{tradeHistory.length > 0 && (
							<div className="d-flex justify-content-center pt-4 pb-3 flex-column">
								<Heading size="24px" className="mb-4 text-start ms-3" bold>
									{tradeHistory.length} Completed Trade{tradeHistory.length > 1 && "s"}
								</Heading>
								<MaxHeightBarrier>
									{tradeHistory.map((trades, index) => (
										<ActiveTradeCard
											tradeInfo={trades}
											noButtons
											noMessage
											withReports
											key={index}
										/>
									))}
									{messageForHistory && (
										<Paragraph size="20px" className="ms-2">
											{messageForHistory}
										</Paragraph>
									)}
								</MaxHeightBarrier>
							</div>
						)}
						{tradeHistory.length === 0 && (
							<div className="d-flex align-items-center justify-content-center flex-column p-5">
								<MissingIcon className="material-icons mb-3">manage_search</MissingIcon>
								<Heading bold size="24px" className="mb-4">
									No Trades Found
								</Heading>
								<PrimaryButton text="Start Trading" onClick={() => navigate("/Sell")} />
							</div>
						)}
						</ContentTab>
			</div>
		</PageBody>
	);
};

export default TradeHistoryCompleted;
