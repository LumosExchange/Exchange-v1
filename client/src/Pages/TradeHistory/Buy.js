import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PageBody, StyledLabel, StyledDropdown } from "../../Components/FormInputs";
import Heading from "../../Components/Heading";
import Paragraph from "../../Components/Paragraph";
import { useNavigate } from "react-router";
import { ActiveTradeCard } from "../../Components/TradeCard";
import { LoadingState } from "../../Components/Profile";
import PrimaryButton from "../../Components/Buttons";
import { AppUrl } from "../../App";
import { MissingIcon, TradeHistoryTabs, ContentTab, MaxHeightBarrier } from "../../Components/TradeComponents";

const TradeHistoryBuy = () => {
	// Collapse Sections
	const [messageForPurchases, setMessageForPurchases] = useState("");
	const [liveTradesBuyer, setLiveTradesBuyer] = useState([]);
	const [isLoading, setIsLoading] = useState("");

	const navigate = useNavigate();

	const getLiveTradesBuyer = () => {
		setIsLoading(true);
		Axios.post(`${AppUrl}/GetLiveTradesBuyer`).then((response) => {
			if (response.data.message) {
				setMessageForPurchases(response.data.message);
				setIsLoading(false);
			} else {
				setLiveTradesBuyer(response.data);
				setIsLoading(false);
			}
		});
	};

	useEffect(() => {
		getLiveTradesBuyer();
	}, []);

	return (
		<PageBody className="d-flex flex-column justify-content-start py-5">
			<div className="container text-center">
				{isLoading && <LoadingState />}
				<TradeHistoryTabs selected="Buy" />
					<ContentTab>
					{liveTradesBuyer.length > 0 && (
						<div className="d-flex justify-content-center pt-4 pb-3 flex-column">
							<Heading size="24px" className="mb-4 text-start ps-3" bold>
								{liveTradesBuyer.length} Active Buy Trades
							</Heading>
							<MaxHeightBarrier>
								{liveTradesBuyer.map((tradeInfo, index) => (
									<React.Fragment>
										<ActiveTradeCard tradeInfo={tradeInfo} type="buying" key={index} withView />
									</React.Fragment>
								))}
								{messageForPurchases && (
									<Paragraph size="20px" className="ms-2">
										{messageForPurchases}
									</Paragraph>
								)}
							</MaxHeightBarrier>
						</div>
						)}
						{liveTradesBuyer.length === 0 && (
							<div className="d-flex align-items-center justify-content-center flex-column p-5">
								<MissingIcon className="material-icons mb-3">manage_search</MissingIcon>
								<Heading bold size="24px" className="mb-4">
									No Trades Found
								</Heading>
								<PrimaryButton text="Start Trading" onClick={() => navigate("/Buy")} />
							</div>
						)}
					</ContentTab>
			</div>
		</PageBody>
	);
};

export default TradeHistoryBuy;
