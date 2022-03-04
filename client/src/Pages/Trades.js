import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Axios from "axios";
import { PageBody, TextArea } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import GradientButton from "../Components/GradientButton";
import PrimaryButton, { SecondaryButton } from "../Components/Buttons";
import { FormInput, StyledLabel, FormCheckbox } from "../Components/FormInputs";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../Components/Card";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import SendButton from "../Components/SendButton";
import { convertCurrencyToSymbol } from "../Helpers";

const HorizontalDivider = styled.hr(
	({ theme }) => css`
		:not([size]) {
			color: ${theme.colors.text_primary};
			height: 1px;
			opacity: 0.2;
		}
`);

const VerticalDivider = styled.hr(
	({ theme }) => css`
		:not([size]) {
			color: ${theme.colors.text_primary};
			height: 100%;
			width: 1px;
			opacity: 0.2;
		}
`);

const HighlightedText = styled.span(
	({ theme }) => css`
		color: ${theme.colors.primary_cta};
`);

const ChatWrapper = styled.div(({ theme }) => css`
		display: flex;
		flex-direction: column;
		position: relative;

		.chat-body {
			overflow-y: auto;
			max-height: 500px;
			min-height: 500px;
		}

		.message {
			border-radius: 20px 20px 0 20px;
			background: ${theme.colors.grey};
			color: ${theme.colors.text_primary};
			padding: 10px 20px;
			font-size: 18px;
			margin-bottom: 28px;
			width: auto;
			display: flex;
			// justify-content: flex-end; justify-content-end align-self-end
			// align-self: flex-end; 

			&.self {
				border-radius: 0px 20px 20px 20px;
				background: ${theme.colors.primary_cta};
				color: ${theme.colors.base_bg};
				// justify-content: flex-start; 
				// align-self: flex-start;
			}
		}

		.messages-icon {
			font-size: 48px;
			color: ${theme.colors.text_primary};
		}
`);

const solQuantity = 2;

const socket = io.connect("http://localhost:3002");



const Trades = () => {
	const [solGbp, setSolGbp] = useState("");
	const [registeredDate, setRegisteredDate] = useState("");
	const [feedbackScore, setFeedbackScore] = useState("");
	const [escrowReleaseTime, setEscrowReleaseTime] = useState("");
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [showChat, setShowChat] = useState(false);
	const [paymentInfo, setPaymentInfo] = useState([]);
	const [room, setRoom] = useState("9f30c282c6");
	const [pageMode, setPageMode] = useState("buy");
	const [buyer, setBuyer] = useState(false);



	const { state } = useLocation();
	const { val } = state;

	const navigate = useNavigate();

	//if (state.buyerOrSeller === "Buyer") {
	//	setBuyer(true);

		//show buyer state
	//} else {
	//	setBuyer(false);
		//show seller side
//	}

	//Get userName && reference
	//room will be refernce so buyer and seller can connect

	//const getDetails = () => {
	//	axios
	//		.post("http://localhost:3001/GetLiveTradeInfo", {
		//		sellerID: state.ID,
		//		paymentMethod: state.paymentMethod,
		//	})
		//	.then((response) => {
		//		setPaymentInfo(response);
		//		console.log(response);
		//		setRoom(response.data.reference);
		//	});
	//};

  const userName = "ABC";
  

	
	
	//chat stuff here
	const joinRoom = () => {
		if (userName !== "" && room !== "") {
			socket.emit("join_room", room);
		}
	};

	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: userName,
				message: currentMessage,
				time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
			};
			await socket.emit("send_message", messageData);
			setMessageList((list) => [...list, messageData]);
			setCurrentMessage("");
		}
	};

	useEffect(() => {
	//	if (paymentInfo.length === 0) {
	//		getDetails();
	//	}

		socket.on("recieve_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);

	//console.log(messageList, 'message list');
	//console.log(currentMessage, 'current message');

//	console.log(paymentInfo, "payment info");

	return (
		<PageBody>
			{pageMode === "buy" && (
				<div className="container">
					<div className="row pt-5">
						<div className="col-12 mb-5 pb-5">
							<Heading size="26px" className="mb-4">
								Offers &gt; Sell SOL to {val.userName} with {val.paymentMethod1}.
							</Heading>
						</div>
						<div className="col-12 col-md-6 row">
							<ChatWrapper>
								<div className="chat-header d-flex align-items-center flex-column">
									<div className="d-flex align-items-center mb-5">
										<i className="material-icons messages-icon me-3">question_answer</i>
										<div className="d-flex flex-column">
											<Paragraph bold size="24px" className="mb-0">
												Conversation
											</Paragraph>
											<Paragraph siuze="14px" className="mb-0">
												Messages are end-to-end encrypted.
											</Paragraph>
										</div>
									</div>
									<div className="chat-body w-100">
										{messageList.map((messageContent) => (
											<div className="d-flex flex-column">
												<div className={
														userName !== messageContent.author
															? "d-flex justify-content-end align-self-end"
															: "d-flex justify-content-start align-self-start"
													}>
													<Paragraph size="16px" className="mb-0 me-2" bold>
														{messageContent.author}
													</Paragraph>
													<Paragraph size="16px" className="mb-0">
														{messageContent.time}
													</Paragraph>
												</div>
												<div
													className={
														userName !== messageContent.author
															? "message justify-content-end align-self-end"
															: "message self justify-content-start align-self-start"
													}
												>
													{messageContent.message}
												</div>
											</div>
										))}
									</div>
								</div>
								<div className="chat-footer d-flex align-items-center">
									<TextArea
										type="text"
										placeholder="Enter message here"
                    value={currentMessage}
										className="me-3"
										onChange={(event) => {
											setCurrentMessage(event.target.value);
										}}
									/>
									<SendButton
										icon="send"
										onClick={() => {
											joinRoom();
											sendMessage();
                      setCurrentMessage('');
										}}
										onKeyPress={(event) => {
											event.key === "Enter" && sendMessage();
										}}
									/>
								</div>
							</ChatWrapper>
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
									<Heading bold>{convertCurrencyToSymbol(state.currency)}{state.solGbp * solQuantity}</Heading>
								</div>
								<Paragraph size="18px" className="pb-3">
									1 SOL = {convertCurrencyToSymbol(state.currency)}
									{state.solGbp}
								</Paragraph>
								<HorizontalDivider />
								<div className="d-flex justify-content-center flex-column">
									<div className="d-flex text-start">
										<FormCheckbox
											type="checkbox"
											id="checkedPayment"
											name="checkedPayment"
											className="me-4"
										/>
										<StyledLabel className="p-0" htmlFor="checkedPayment">
											<HighlightedText className="me-1">YES!</HighlightedText> I have received the
											payment from the buyer.
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
			{pageMode === "sell" && (
				<div className="container">
					<div className="row pt-5">
						<div className="col-12 mb-5 pb-5">
							<Heading size="26px" className="mb-4">
								Offers &gt; Sell SOL to {val.userName} with {val.paymentMethod1}.
							</Heading>
						</div>
						<div className="col-12 col-md-6 row">
							<div className="col-10">Message Area</div>
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
								<Paragraph size="18px" className="pb-3">
									1 SOL = {convertCurrencyToSymbol(state.currency)}
									{state.solGbp}
								</Paragraph>
								<HorizontalDivider />
								<div className="d-flex justify-content-center flex-column">
									<Paragraph bold size="24px" className="me-2">
										Waiting for payment from the buyer
									</Paragraph>
									<Paragraph size="18px" className="me-2 py-3">
										Your SOL is now secured in escrow! Please ensure{" "}
										<HighlightedText className="me-2">
											you have received the payment
										</HighlightedText>
										before continuing.
									</Paragraph>
									<div className="d-flex text-start">
										<FormCheckbox
											type="checkbox"
											id="checkedPayment"
											name="checkedPayment"
											className="me-4"
										/>
										<StyledLabel className="p-0" htmlFor="checkedPayment">
											<HighlightedText className="me-1">YES!</HighlightedText> I have confirmed
											that payment from the buyer is received and checked.
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
};

export default Trades;
