import React, { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import Axios from "axios";
import { PageBody, StyledDropdown, TextArea } from "../Components/FormInputs";
import Card from "../Components/Card";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import GradientButton from "../Components/GradientButton";
import PrimaryButton from "../Components/Buttons";
import { FormInput, StyledLabel } from "../Components/FormInputs";
import { useNavigate, useLocation } from "react-router-dom";
import IconSolana from '../Images/icon-circle-solana.svg';

const SwitchButton = styled.button(({ theme }) => css`
	width: 50px;
	min-width: 50px;
	height: 50px;
	border-radius: 50px;
	border: 1px solid ${theme.colors.grey};
	margin-top: 20px;
`);

const ConversionArea = styled.div(({ theme }) => css`
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

		img {
			width: 24px;
			height: 24px;
		}
	}
`);

const Offer = () => {
	const [offerAmount, setOfferAmount] = useState("");
	const [offerAmountInSol, setOfferAmountInSol] = useState("");
	const [offerAmountInCurrency, setOfferAmountInCurrency] = useState("");
	const [offerMessage, setOfferMessage] = useState("");
	const [solGbp, setSolGbp] = useState("");
	const [conversionMode, setConversionMode] = useState("FIATtoSOL");

	const { state } = useLocation();
	const { val } = state;
	console.log(state, 'state passed through');


	const getCurrentSolPrice = () => {
		fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=gbp')
		.then((response) => response.json()
		.then(function (data) {
			const setCorrectPrice = data.solana.gbp;
			setSolGbp(data.solana.gbp);
		}));
	}

	const convertAmountToSOL = (amount) => {
		const convertedAmount = amount / solGbp;
		console.log(convertedAmount, 'converted amount');
		setOfferAmountInSol(convertedAmount);
	}

	const convertSolToAmount = (amount) => {
		const convertedAmount2 = solGbp * amount;
		console.log(convertedAmount2, 'converted amount');
		setOfferAmountInCurrency(convertedAmount2);
	}

	const switchConversionMode = () => {
		setOfferAmount('');
		setOfferAmountInCurrency('');
		setOfferAmountInSol('');
		if (conversionMode === "FIATtoSOL"){
			setConversionMode('SOLtoFIAT');
		} else {
			setConversionMode('FIATtoSOL');
		}
	}

	useEffect(() => {
		getCurrentSolPrice();
	}, []);

	console.log(solGbp, 'SOL Price');

  	return (
		<PageBody>
			<div className="container">
				<div className="row pt-5">
					<div className="col-12 mb-5 pb-5">
						<Heading size="26px">Buy SOL from {state.val.userName} with {state.val.paymentMethod1} {state.val.paymentMethod2 && `or ${state.val.paymentMethod2}`}.</Heading>
						<Card className="p-4 mb-3" color="grey">
									<div className="row">
										<div className="col-3">
											<Heading size="24px" bold>{val.userName}</Heading>
										</div>
										<div className="col-6 d-flex align-items-center">
											<i className="material-icons">place</i>
											{val.Town}, {val.Country}
										</div>
										<div className="col-3">
											<Heading size="24px" color="primary_cta" bold>
												{val.aboveOrBelow === 'above' && ((solGbp / 100) * (100 + val.percentChange)).toFixed(2)}
												{val.aboveOrBelow === 'below' && ((solGbp / 100) * (100 - val.percentChange)).toFixed(2)}
											</Heading>
											{/*
											<Heading size="18px">Total Sol for sale</Heading>
												{val.amountForSale}
											<Heading size="18px">Total value of sale</Heading>
												{currencySymbol}{selectedCurrency === 'GBP' && ((val.amountForSale * solgbp)).toFixed(2)}
												{selectedCurrency === 'USD' && ((val.amountForSale * solusd))}
											</Heading>
											*/}
										</div>
										<div className="col-3">110 Trades</div>
										<div className="col-3">{val.paymentMethod1}{' & '}{val.paymentMethod2}</div>
										<div className="col-3">
											<Paragraph size="18px">
												{val.percentChange}%
												{' '}{val.aboveOrBelow}{' '}market
											</Paragraph>
										</div>
									</div>
								</Card>
					</div>
					<div className="col-12 col-md-6 row">
						<div className="col-2 d-flex align-items-center">
							<SwitchButton
								className="d-flex align-items-center justify-content-center"
								onClick={ switchConversionMode }
							>
								<i className="material-icons">import_export</i>
							</SwitchButton>
						</div>
						<div className="col-10">
							<StyledLabel
								padding="0 0 10px 0"
								bold
								htmlFor="offerAmount"
							>
								Offer Amount
							</StyledLabel>
							{conversionMode === 'FIATtoSOL' && (
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
										<Heading size="24px" className="mb-0">{offerAmountInSol || 0.00}</Heading>
									</ConversionArea>
								</React.Fragment>
							)}
							{conversionMode === 'SOLtoFIAT' && (
								<React.Fragment>
									<FormInput
										type="text"
										id="offerAmount"
										value={offerAmount}
										name="offerAmount"
										placeholder="0 SOL"
										hasIcon
										customIcon={IconSolana}
										onChange={(e) => {
											setOfferAmount(e.target.value);
											convertSolToAmount(e.target.value);
										}}
										className="w-100 mb-2"
									/>
									<ConversionArea>
										<div className="icon-area d-flex align-items-center">
											<i className="material-icons">currency_pound</i>
										</div>
										<Heading size="24px" className="mb-0">{offerAmountInCurrency || 0.00}</Heading>
									</ConversionArea>
								</React.Fragment>
							)}
						</div>
						<StyledLabel
							padding="20px 0 10px 0"
							bold
							htmlFor="offerMessage"
						>
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
					</div>
					<div className="col-12 col-md-6 row mt-4">
						<div className="col-12 text-center">
							<Heading bold>1 SOL = {' '}
								{val.aboveOrBelow === 'above' && ((solGbp / 100) * (100 + val.percentChange)).toFixed(2)}
								{val.aboveOrBelow === 'below' && ((solGbp / 100) * (100 - val.percentChange)).toFixed(2)}</Heading>
							<Paragraph size="18px">SOL/GBP rate is secured for 111 seconds.</Paragraph>
						</div>
						<div className="col-6">
							<Paragraph bold>About the Trader</Paragraph>
							<Paragraph color="primary_cta" size="20px">{val.userName}</Paragraph>
							<Paragraph>Feedback score: 98%</Paragraph>
							<Paragraph>Registered: Aug 2021</Paragraph>
							<Paragraph>Total Trades: ~250</Paragraph>
						</div>
						<div className="col-6">
							<Paragraph bold>Headline</Paragraph>
							<Card className="p-3 mb-4">Paypal, Wise supported. Quick response!</Card>
							<Paragraph bold>Payment Methods</Paragraph>
							<Paragraph>{state.val.paymentMethod1}, {state.val.paymentMethod2}</Paragraph>
						</div>
					</div>
				</div>
			</div>
		</PageBody>
  	);
}

export default Offer;
