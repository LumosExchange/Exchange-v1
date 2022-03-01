import React, { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import Axios from "axios";
import { PageBody } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import GradientButton from "../Components/GradientButton";
import PrimaryButton, { SecondaryButton } from "../Components/Buttons";
import { FormInput, StyledLabel, FormCheckbox } from "../Components/FormInputs";
import { useNavigate, useLocation } from "react-router-dom";
import Card from '../Components/Card';
import io from 'socket.io-client';


const SwitchButton = styled.button(({ theme }) => css`
	width: 50px;
	min-width: 50px;
	height: 50px;
	border-radius: 50px;
	border: 0px;
	background: ${theme.colors.primary_cta};
	color: ${theme.colors.base_bg};
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

		i {
			color: ${theme.colors.text_primary};
		}

		img {
			width: 24px;
			height: 24px;
		}
	}
`);

const HorizontalDivider = styled.hr(({ theme }) => css`
    :not([size]){
        color: ${theme.colors.text_primary};
        height: 1px;
        opacity: 0.2;
    }
`);

const VerticalDivider = styled.hr(({ theme }) => css`
    :not([size]){
        color: ${theme.colors.text_primary};
        height: 100%;
		width: 1px;
        opacity: 0.2;
    }
`);

const convertCurrencyToSymbol = (currency) => {
	if (currency === 'GBP'){
		return "£";
	}
	if (currency === 'USD'){
		return "$";
	}
}

const HighlightedText = styled.span(({ theme }) => css`
	color: ${theme.colors.primary_cta};
`);

const solQuantity = 2;

const Trade = () => {
	const [solGbp, setSolGbp] = useState("");

	const [registeredDate, setRegisteredDate] = useState("");
	const [feedbackScore, setFeedbackScore] = useState("");
	const [escrowReleaseTime, setEscrowReleaseTime] = useState("");
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState("");
	//const [room, setRoom] = useState("");
	const room = "hello";

	const socket = io.connect("http://localhost:3002");

	const [pageMode, setPageMode] = useState("buy");

	const { state } = useLocation();
	const { val } = state;

	const navigate = useNavigate();


	//Get userName && reference 
	//room will be refernce so buyer and seller can connect 


	//chat stuff here
	const joinRoom = () => {
		if(val.userName !=="" && room !=="") {
			socket.emit("join_room", room);

		}
	}




	const sendMessage = async() => {
		console.log(currentMessage);
		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: val.userName,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
			};

			await socket.emit("send_message", messageData);
		
		}
	};

	useEffect(() => {
	//	getSellerInfo();
		socket.on("receive_message", (data) => {
		  setMessageList((list) => [...list, data]);
		});
	  }, [socket]);


// do we still need this???
	//  const getSellerInfo = () => {
//		Axios.post("http://localhost:3001/GetSellerInfo", {
	//		sellerID: val.userID,
	////	}).then((response) => {
	//		setRegisteredDate(response.data.registeredDate);
	//		setFeedbackScore(response.data.feedbackScore);
	//		setEscrowReleaseTime(response.data.escrowReleaseTime);
	//	})
//	};

  	return (
		<PageBody>
			{pageMode === 'buy' && (
				<div className="container">
					<div className="row pt-5">
						<div className="col-12 mb-5 pb-5">
							<Heading size="26px" className="mb-4">Offers &gt; Buy SOL from {val.userName} with {val.paymentMethod1}.</Heading>
						</div>
						<div className="col-12 col-md-6 row">
							<div className="col-10">
								<div>
									<div className="chat-header">
										<p>Live Chat</p>
									</div>
									<div className="chat-body"></div>
									<div className="chat-footer">
										<input 
										type="text"
										placeholder="Hey..."
										onChange={(event) => {
											setCurrentMessage(event.target.value);
										}}
										/>
										<button onClick={joinRoom, sendMessage}>&#9658;</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-1 d-flex justify-content-center">
							<VerticalDivider />
						</div>
						<div className="col-12 col-md-5 row mt-4">
							<div className="col-12 text-center">
								<div className="d-flex">
									<Heading className="me-2">Buying</Heading>
									<Heading bold>{solQuantity} SOL</Heading>
									<Heading className="mx-2">for</Heading>
									<Heading bold>{state.solGbp * solQuantity}</Heading>
								</div>
								<Paragraph size="18px" className="pb-3">1 SOL = {convertCurrencyToSymbol(state.currency)}{state.solGbp}</Paragraph>
								<HorizontalDivider />
								<div className="d-flex justify-content-center flex-column">
									<Paragraph bold size="24px" className="me-2">Please pay {convertCurrencyToSymbol(state.currency)}{' '}{state.solGbp * solQuantity}</Paragraph>
									<Paragraph size="18px" className="me-2">
										into
									</Paragraph>
									<Card className="p-3 mb-4">
										Bank Details Here
									</Card>
									<div className="d-flex text-start">
										<FormCheckbox type="checkbox" id="checkedPayment" name="checkedPayment" className="me-4" />
										<StyledLabel className="p-0" htmlFor="checkedPayment">
										<HighlightedText className="me-1">YES!</HighlightedText> I have sent the payment to the seller.
										</StyledLabel>
									</div>
									<div className="row mt-5">
										<div className="col-6">
											<SecondaryButton
												text="Cancel"
												className="m-auto mt-3"
												onClick={null}
												type="check"
												value="check"
											/>
										</div>
										<div className="col-6">
											<PrimaryButton
												text="Continue"
												className="m-auto mt-3"
												onClick={null}
												type="check"
												value="check"
												hasIcon
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{pageMode === 'sell' && (
				<div className="container">
					<div className="row pt-5">
						<div className="col-12 mb-5 pb-5">
							<Heading size="26px" className="mb-4">Offers &gt; Sell SOL to {val.userName} with {val.paymentMethod1}.</Heading>
						</div>
						<div className="col-12 col-md-6 row">
							<div className="col-10">
								Message Area
							</div>
						</div>
						<div className="col-1 d-flex justify-content-center">
							<VerticalDivider />
						</div>
						<div className="col-12 col-md-5 row mt-4">
							<div className="col-12 text-center">
								<div className="d-flex">
									<Heading className="me-2">Selling</Heading>
									<Heading bold>{solQuantity} SOL</Heading>
									<Heading className="mx-2">for</Heading>
									<Heading bold>{state.solGbp * solQuantity}</Heading>
								</div>
								<Paragraph size="18px" className="pb-3">1 SOL = {convertCurrencyToSymbol(state.currency)}{state.solGbp}</Paragraph>
								<HorizontalDivider />
								<div className="d-flex justify-content-center flex-column">
									<Paragraph bold size="24px" className="me-2">Waiting for payment from the buyer</Paragraph>
									<Paragraph size="18px" className="me-2 py-3">
										Your SOL is now secured in escrow!
										Please ensure <HighlightedText className="me-2">you have received the payment</HighlightedText>
										before continuing.
									</Paragraph>
									<div className="d-flex text-start">
										<FormCheckbox type="checkbox" id="checkedPayment" name="checkedPayment" className="me-4" />
										<StyledLabel className="p-0" htmlFor="checkedPayment">
										<HighlightedText className="me-1">YES!</HighlightedText> I have confirmed that payment from
										the buyer is received and checked.
										</StyledLabel>
									</div>
									<div className="row mt-5">
										<div className="col-6">
											<SecondaryButton
												text="Cancel"
												className="m-auto mt-3"
												onClick={null}
												type="check"
												value="check"
											/>
										</div>
										<div className="col-6">
											<PrimaryButton
												text="Continue"
												className="m-auto mt-3"
												onClick={null}
												type="check"
												value="check"
												hasIcon
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</PageBody>
  	);
}

export default Trade;
