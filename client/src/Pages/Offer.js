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

const Offer = () => {
	const [offerAmount, setOfferAmount] = useState("");
	const [offerAmountInSol, setOfferAmountInSol] = useState("");
	const [offerMessage, setOfferMessage] = useState("");
	const [solGbp, setSolGbp] = useState("");

	const { state } = useLocation();
	const { val } = state;
	console.log(state, 'state passed through');


	const getCurrentSolPrice = () => {
		fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=gbp')
		.then((response) => response.json()
		.then(function (data) {
			setSolGbp(data.solana.gbp);
		}));
	}

	const convertAmountToSOL = (amount) => {
		const convertedAmount = amount / solGbp;
		console.log(convertedAmount, 'converted amount');
		setOfferAmountInSol(convertedAmount);
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
						<Heading size="26px">Buy SOL from {state.val.userName} with {state.val.paymentMethod1}.</Heading>
						<Card className="p-4">
							<div>{state.val.userName}</div>
						</Card>
					</div>
					<div className="col-12 col-md-6">
						<StyledLabel
							padding="0 0 10px 0"
							bold
							htmlFor="offerAmount"
						>
							Offer Amount
						</StyledLabel>
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
						<FormInput
							type="text"
							id="offerAmountInSol"
							value={offerAmountInSol}
							name="offerAmountInSol"
							placeholder=""
							hasIcon
							icon="token"
							customIcon={IconSolana}
							className="w-100"
						/>
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
							<Heading bold>1 SOL = xxx</Heading>
							<Paragraph size="18px">SOL/GBP rate is secured for 111 seconds.</Paragraph>
						</div>
						<div className="col-6">Left</div>
						<div className="col-6">Right</div>
					</div>
				</div>
			</div>
		</PageBody>
  	);
}

export default Offer;
