import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Axios from "axios";
import { PageBody, StyledDropdown, TextArea } from "../Components/FormInputs";
import Card from "../Components/Card";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import GradientButton from "../Components/GradientButton";
import PrimaryButton, { InvisibleButton } from "../Components/Buttons";
import { FormInput, StyledLabel } from "../Components/FormInputs";
import { useNavigate, useLocation } from "react-router-dom";
import IconSolana from "../Images/icon-circle-solana.svg";
import TradeCard from "../Components/TradeCard";
import { convertCurrencyToSymbol } from "../Helpers";

const SwitchButton = styled.button(
	({ theme }) => css`
		width: 50px;
		min-width: 50px;
		height: 50px;
		border-radius: 50px;
		border: 0px;
		background: ${theme.colors.primary_cta};
		color: ${theme.colors.base_bg};
	`
);

const ConversionArea = styled.div(
	({ theme }) => css`
		min-height: 60px;
		background: ${theme.colors.grey};
		border-radius: 10px;
		display: flex;
		align-items: center;
		padding: 0;
		cursor: text;

		.icon-area {
			min-height: 60px;
			padding: 10px 20px 10px 10px;
			border-radius: 10px 0 0 10px;

			i {
				color: ${theme.colors.text_primary};
			}

			img {
				width: 24px;
				height: 24px;
			}
		}
	`
);

const HorizontalDivider = styled.hr(
	({ theme }) => css`
		:not([size]) {
			color: ${theme.colors.text_primary};
			height: 1px;
			opacity: 0.2;
		}
	`
);

const VerticalDivider = styled.hr(
	({ theme }) => css`
		:not([size]) {
			color: ${theme.colors.text_primary};
			height: 100%;
			width: 1px;
			opacity: 0.2;
		}
	`
);

const Offer = () => {
	const [offerAmount, setOfferAmount] = useState("");
	const [offerAmountInSol, setOfferAmountInSol] = useState("");
	const [offerAmountInCurrency, setOfferAmountInCurrency] = useState("");
	const [offerMessage, setOfferMessage] = useState("");
	const [solGbp, setSolGbp] = useState("");
	const [conversionMode, setConversionMode] = useState("FIATtoSOL");
	const [paymentMethod, setPaymentMethod] = useState("Please Select");

	const [registeredDate, setRegisteredDate] = useState("");
	const [feedbackScore, setFeedbackScore] = useState("");
	const [escrowReleaseTime, setEscrowReleaseTime] = useState("");
	const [liveTradeID, setLiveTradeID] = useState("");

	const { state } = useLocation();
	const { val } = state;
	
	const getCurrentSolPrice = () => {
		fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=gbp").then((response) =>
			response.json().then(function (data) {
				if (val.aboveOrBelow === "above") {
					const listingPrice = (data.solana.gbp / 100) * (100 + val.percentChange);
					setSolGbp(listingPrice.toFixed(2));
				} else {
					const listingPrice = (data.solana.gbp / 100) * (100 - val.percentChange);
					setSolGbp(listingPrice.toFixed(2));
				}
			})
		);
	};

	const convertAmountToSOL = (amount) => {
		const convertedAmount = amount / solGbp;
		setOfferAmountInSol(convertedAmount);
	};

	const convertSolToAmount = (amount) => {
		const convertedAmount2 = solGbp * amount;
		setOfferAmountInCurrency(convertedAmount2);
	};

	const switchConversionMode = () => {
		setOfferAmount("");
		setOfferAmountInCurrency("");
		setOfferAmountInSol("");
		if (conversionMode === "FIATtoSOL") {
			setConversionMode("SOLtoFIAT");
		} else {
			setConversionMode("FIATtoSOL");
		}
	};

	const getSellerInfo = () => {
		Axios.post("http://localhost:3001/GetSellerInfo", {
			sellerID: val.userID,
		}).then((response) => {
			setRegisteredDate(response.data.registeredDate);
			setFeedbackScore(response.data.feedbackScore);
			setEscrowReleaseTime(response.data.escrowReleaseTime);
		});
	};

	const openTrade = () => {
		console.log(val.saleID);
		Axios.post("http://localhost:3001/OpenTrade", {
			saleID: val.saleID,
			sellerID: val.userID,
			paymentMethod: paymentMethod,
			userSolPrice: solGbp,
			amountOfSol: offerAmountInSol,
			fiatAmount: offerAmount || offerAmountInCurrency,
			paymentCurrency: currency,
			message: offerMessage,
		}).then((response) => {
			setLiveTradeID(response.data.insertId);
			console.log('LIVE ID ' , response.data.insertId);

			//Handle response here any errors etc
		});
		
	};

	useEffect(() => {
		getCurrentSolPrice();
		getSellerInfo();
	}, []);

	const filteredPaymentMethods = ["Please Select", val.paymentMethod1, val.paymentMethod2];
	const navigate = useNavigate();

	const currency = state.currency;
	const formattedCurrency = convertCurrencyToSymbol(state.currency);

	console.log(offerAmount, "offer amount in GBP");
	console.log(offerAmountInSol, "offer amount in SOL");
	console.log(offerAmountInCurrency, "offer amount in currency");

	console.log('Live trade id: ', liveTradeID);
	console.log('val: ', val);

	return (
		<PageBody>
			<div className="container">
				<div className="row pt-5">
					<div className="col-12 mb-4">
						<InvisibleButton className="d-flex align-items-center" onClick={() => navigate("/Buy")}>
							<i className="material-icons me-2">arrow_back</i>
							<Paragraph size="20px" className="mb-0" color="primary_cta">
								Back to Buy
							</Paragraph>
						</InvisibleButton>
					</div>
					<div className="col-12 mb-5 pb-5">
						<Heading size="26px" className="mb-4">
							Buy SOL from {val.userName} with {val.paymentMethod1}{" "}
							{val.paymentMethod2 && `or ${val.paymentMethod2}`}.
						</Heading>
						<TradeCard val={val} withoutButton />
					</div>
					<div className="col-12 col-md-6 row">
						<div className="col d-flex align-items-center" style={{ maxHeight: "200px" }}>
							<SwitchButton
								className="d-flex align-items-center justify-content-center"
								onClick={switchConversionMode}
							>
								<i className="material-icons">import_export</i>
							</SwitchButton>
						</div>
						<div className="col-10">
							<StyledLabel padding="0 0 10px 0" bold htmlFor="offerAmount">
								Offer Amount
							</StyledLabel>
							{conversionMode === "FIATtoSOL" && (
								<React.Fragment>
									<FormInput
										type="text"
										id="offerAmount"
										value={offerAmount}
										name="offerAmount"
										placeholder="0.00"
										hasIcon
										icon="currency_pound"
										onChange={(e) => {
											setOfferAmount(e.target.value);
											convertAmountToSOL(e.target.value);
										}}
										className="w-100 mb-2"
									/>
									<ConversionArea>
										<div className="icon-area d-flex align-items-center">
											<img src={IconSolana} alt="SOL" />
										</div>
										<Heading size="24px" className="mb-0">
											{offerAmountInSol || 0.0}
										</Heading>
									</ConversionArea>
								</React.Fragment>
							)}
							{conversionMode === "SOLtoFIAT" && (
								<React.Fragment>
									<FormInput
										type="text"
										id="offerAmount"
										value={offerAmountInSol}
										name="offerAmount"
										placeholder="0 SOL"
										hasIcon
										customIcon={IconSolana}
										onChange={(e) => {
											setOfferAmountInSol(e.target.value);
											convertSolToAmount(e.target.value);
										}}
										className="w-100 mb-2"
									/>
									<ConversionArea>
										<div className="icon-area d-flex align-items-center">
											<i className="material-icons">currency_pound</i>
										</div>
										<Heading size="24px" className="mb-0">
											{offerAmountInCurrency || 0.0}
										</Heading>
									</ConversionArea>
								</React.Fragment>
							)}
							<StyledLabel padding="20px 0 10px 0" bold htmlFor="offerMessage">
								Send a Message
							</StyledLabel>
							<TextArea
								type="text"
								id="offerMessage"
								value={offerMessage}
								name="offerMessage"
								placeholder="Enter message here"
								onChange={(e) => {
									setOfferMessage(e.target.value);
								}}
								className="w-100 mb-2"
							/>
							<div className="w-100 p-0 mt-3">
								<StyledLabel padding="0 0 10px 0" bold htmlFor="preferredPayment">
									Select Payment Method
								</StyledLabel>
								<StyledDropdown
									type="change"
									placeholder="preferredPayment"
									name="preferredPayment"
									id="preferredPayment"
									color="btn"
									onChange={(e) => {
										setPaymentMethod(e.target.value);
									}}
									className="w-100"
									required
								>
									{filteredPaymentMethods.map((option) => (
										<option value={option}>{option}</option>
									))}
								</StyledDropdown>
							</div>
							<div className="w-100 p-0 mt-3">
								<GradientButton
									text="Open Trade"
									fontSize="24px"
									padding="4px 20px"
									className="w-100"
									onClick={() => {
										openTrade();
										navigate("/Buying", {
											state: {
												liveTradeID,
											},
										});
									}}
									disabled={
										offerMessage.length === 0 ||
										paymentMethod === "Please Select" ||
										offerAmountInSol.length === 0
									}
								/>
								<button
									onClick={() => {
										navigate("/Selling", {
											state: {
												liveTradeID,
											},
										});
									}}
								></button>
							</div>
						</div>
					</div>
					<div className="col-1 d-flex justify-content-center">
						<VerticalDivider />
					</div>
					<div className="col-12 col-md-5 row mt-4">
						<div className="col-12 text-center">
							<Heading bold>
								1 SOL = {formattedCurrency}
								{solGbp}
							</Heading>
							<Paragraph size="18px" className="pb-3">
								SOL/GBP rate is secured for 111 seconds.
							</Paragraph>
							<HorizontalDivider />
						</div>
						<div className="col-6">
							<Paragraph bold>About the Trader</Paragraph>
							<div className="d-flex mb-2">
								<i className="material-icons me-1">person</i>
								<Paragraph color="primary_cta" size="20px" bold className="mb-0">
									{val.userName}
								</Paragraph>
							</div>
							<Paragraph>
								Feedback score: {((feedbackScore * 100) / 3).toFixed(2)}
								{"%"}
							</Paragraph>
							<Paragraph>Registered: {new Date(registeredDate).toLocaleDateString()}</Paragraph>
							<Paragraph>Total Trades: {val.tradeHistory}</Paragraph>
							<Paragraph>
								Median Escrow Time: {(escrowReleaseTime / 60).toFixed(2)}
								{" Mins"}
							</Paragraph>
						</div>
						<div className="col-6">
							<Paragraph bold>Headline</Paragraph>
							<Card className="p-3 mb-4">Paypal, Wise supported. Quick response!</Card>
							<Paragraph bold>Payment Methods</Paragraph>
							<Paragraph>
								{val.paymentMethod1}, {val.paymentMethod2}
							</Paragraph>
						</div>
					</div>
				</div>
			</div>
		</PageBody>
	);
};

export default Offer;
