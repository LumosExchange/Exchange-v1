import React, { useState, useEffect, createContext, useMemo } from "react";
import styled, { css, keyframes } from "styled-components";
import Axios from "axios";
import { PageBody, TextArea } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton, { SecondaryButton } from "../Components/Buttons";
import { FormInput, StyledLabel, FormCheckbox } from "../Components/FormInputs";
import { useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import SendButton from "../Components/SendButton";
import { convertCurrencyToSymbol } from "../Helpers";
import {
	Stepper,
	HalfStepper,
	GiveFeedback,
	LumosIcon,
	HorizontalDivider,
	VerticalDivider,
	ChatWrapper,
	PaymentInfoArea,
	IconPrimaryCta,
	FeedbackContext,
} from '../Components/TradeComponents';
import { Link } from 'react-router-dom';
import { StyledCode } from "./Profile/Wallets";
import { Warning } from "./Register";

const socket = io.connect("http://localhost:3002");

const Selling = ({ userName }) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [paymentInfo, setPaymentInfo] = useState([]);
	const [room, setRoom] = useState("");
	const [userNameBuyer, setUserNameBuyer] = useState("");
	const [reference, setReference] = useState("");
	const [solAmount, setSolAmount] = useState("");
	const [buyerID, setBuyerID] = useState("");
	const [sellerID, setSellerID] = useState("");
	const [fiatAmount, setFiatAmount] = useState("");
	const [paymentCurrency, setPaymentCurrency] = useState("");
	const [paymentRecieved, setPaymentRecieved] = useState("");
	const [userSolPrice, setUserSolPrice] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("");
	const [firstMessage, setFirstMessage] = useState("");
	const [currentStep, setCurrentStep] = useState("selling");
	const [isPaymentSent, setIsPaymentSent] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState("");
	const [feedBack, setFeedback] = useState("");
	const [walletAddress, setWalletAddress] = useState("");
	const [confirmation, setConfirmation] = useState(false);

	const { state } = useLocation();
	const liveTradeID = state.liveTradeID;
	const paymentSentSetter = state.paymentSent;

	//Get trade ID then use that to populate other things
	const getTradeDetails = () => {
		axios
		.get("http://localhost:3001/GetLiveTradeDetails", {
		  params: {
			liveTradeID: liveTradeID,
		  },
		}).then((response) => {
			setReference(response.data[0].Reference);
			setRoom(response.data[0].Reference);
			socket.emit("join_room", response.data[0].Reference);
			setSolAmount(response.data[0].amountOfSol);
			setPaymentMethod(response.data[0].paymentMethod);
			setBuyerID(response.data[0].buyerID);
			setSellerID(response.data[0].sellerID);
			setFiatAmount(response.data[0].fiatAmount);
			setPaymentCurrency(response.data[0].paymentCurrency);
			setPaymentRecieved(response.data[0].paymentRecieved);
			setUserSolPrice(response.data[0].userSolPrice);
			setFirstMessage(response.data[0].Message);
			setWalletAddress(response.data[0].walletAddress);

			//Get buyer username 

			axios.get("http://localhost:3001/getUserNameBuyer", { params: {
				buyerID: response.data[0].buyerID,
			}}).then((response2) => {
				setUserNameBuyer(response2.data[0].userName);
				console.log('Buyer username : ', response2.data[0].userName);

				const messageData = {
					room: response.data[0].Reference,
					author: response2.data[0].userName,
					message: response.data[0].Message,
					time:
					  new Date(Date.now()).getHours() +
					  ":" +
					  new Date(Date.now()).getMinutes(),
				  };
				  socket.emit("send_message", messageData);
							setMessageList((list) => [...list, messageData]);
							setCurrentMessage("");
				
			})
		
		});
	}

	const sentPayment = () => {
		axios
		  .post("http://localhost:3001/updateLiveTradePayment", {
			liveTradeID,
			userName,
		  })
		  .then((response) => {
			if (response.data.update === true) {
			  //send message to convo letting the seller know youve sent the payment
			  const messageData = {
				room: room,
				author: "Lumos Exchange",
				message:
				  "Please note " +
				  userName +
				  " has confirmed they have sent the payment",
				time:
				  new Date(Date.now()).getHours() +
				  ":" +
				  new Date(Date.now()).getMinutes(),
			  };
			  socket.emit("send_message", messageData);
			  setMessageList((list) => [...list, messageData]);
			  setCurrentMessage("");
			  setCurrentStep("transfer");
			} else {
			  //handle error here some sort of popup / message to say error please try again
			}
		  });
	  };

	  const setPaymentAsSent = () => {
		setPaymentAsSent(true);
	  };

	//Join the user to the room
	const joinRoom = async () => {
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

	const value = useMemo(() => {
		return {
		  feedBack,
		  setFeedback,
		}
	  }, [feedBack, setFeedback]);

	useEffect(() => {
		getTradeDetails();
		joinRoom();

		if (paymentSentSetter === "YES") {
			setCurrentStep("transfer");
		} else {
			setCurrentStep("selling");
		}

		socket.on("recieve_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);

	const formattedCurrency = convertCurrencyToSymbol(paymentCurrency);

	return (
		<PageBody>
			<div className="container">
				<div className="row py-5 mb-5">
					<div className="col-12 mb-5 pb-5">
						<Heading size="26px" className="mb-4">
							Offers &gt; Sell SOL to {userNameBuyer} with {paymentMethod}.
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
											<div
												className={
													(messageContent.author === "Lumos Exchange" &&
													"d-flex justify-content-center align-self-center") ||
													(userName !== messageContent.author
													? "d-flex self justify-content-end align-self-end"
													: `d-flex justify-content-start align-self-start`)
												}
											>
												{messageContent.author === "Lumos Exchange" && (
													<LumosIcon className="me-1 mb-2" />
												)}
												<Paragraph size="16px" className="mb-0 me-2" bold>
													{messageContent.author}
												</Paragraph>
												<Paragraph size="16px" className="mb-0">
													{messageContent.time}
												</Paragraph>
											</div>
											<div
												className={
													(messageContent.author === "Lumos Exchange" &&
													"message admin justify-content-center text-center px-5") ||
													(userName === messageContent.author
													? "message self justify-content-start align-self-start"
													: "message justify-content-end align-self-end")
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
										sendMessage();
										setCurrentMessage("");
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
					{currentStep === "selling" && (
						<div className="col-12 col-md-5 row">
							<HalfStepper />
							<div className="col-12 text-center">
								<Heading className="me-2 d-inline-block">Selling</Heading>
								<Heading bold className="d-inline-block">
									{solAmount} SOL
								</Heading>
								<Heading className="mx-2 d-inline-block">for</Heading>
								<Heading bold className="d-inline-block">
									{formattedCurrency}
									{fiatAmount}
								</Heading>
								<Paragraph size="18px" className="pb-3">
									1 SOL = {formattedCurrency}
									{userSolPrice}
								</Paragraph>
								<HorizontalDivider />
								<div className="d-flex justify-content-center flex-column">
									<Paragraph bold size="24px" className="me-2">
										Waiting for payment from the buyer
									</Paragraph>
									<Paragraph size="18px" className="me-2 mb-0 d-none">
										Your SOL is now secured in escrow!
									</Paragraph>
									<Paragraph size="18px" className="me-2 mb-0" color="primary_cta">
										Please ensure you have received the payment
									</Paragraph>
									<Paragraph size="18px" className="me-2 mb-5">
										before continuing.
									</Paragraph>

									<PaymentInfoArea
										paymentInfo={paymentInfo}
										paymentMethod={paymentMethod}
										reference={reference}
									/>
									<div className="d-flex text-start">
										<PrimaryButton
											text={isPaymentSent ? "Payment marked as received" : "I've received the payment"}
											className="w-100"
											onClick={() => setIsPaymentSent(true)}
											disabled={isPaymentSent}
										/>
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
												onClick={ sentPayment }
												type="check"
												value="check"
												hasIcon
												disabled={!isPaymentSent}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{currentStep === "transfer" && (
						<div className="col-12 col-md-5 mt-4">
							<Stepper step2Title="Send Payment to the Seller" />
							<div className="col-12 text-center">
								<Heading bold className="d-inline-block">
									{solAmount} SOL
								</Heading>
								<Paragraph size="18px">Needs to be sent to the wallet addresss:</Paragraph>
								<StyledCode>Wallet here</StyledCode>
								<HorizontalDivider />
								<div className="d-flex align-items-center py-3">
									<Warning />
									<Paragraph className="mb-0 text-start" size="18px">
										Please double and triple check your wallet address before confirming. Do not mark as SOL received until the funds are in your wallet.
									</Paragraph>
								</div>
								<div className="d-flex align-items-center mb-4 pt-3">
									<FormCheckbox type="checkbox" id="solReceived" name="solReceived" onChange={(e) => setConfirmation(e.target.checked) } />
									<StyledLabel htmlFor="solReceived">I've sent the SOL to the buyer's wallet address.</StyledLabel>
								</div>
								<div className="d-flex justify-content-center flex-column">
									<div className="col-12">
										<PrimaryButton
											text="Continue"
											className="w-100 mt-3"
											onClick={() => setCurrentStep("sold")}
											disabled={!confirmation}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
					{currentStep === "sold" && (
						<div className="col-12 col-md-5 row mt-4">
						<Stepper />
						<div className="col-12 text-center">
							<Heading className="me-2 d-inline-block">Sold</Heading>
							<Heading bold className="d-inline-block">
								{solAmount} SOL
							</Heading>
							<Heading className="mx-2 d-inline-block">for</Heading>
							<Heading bold className="d-inline-block">
								{formattedCurrency}
								{fiatAmount}
							</Heading>
							<Paragraph size="18px" className="pb-3">
								1 SOL = {formattedCurrency}
								{userSolPrice}
							</Paragraph>
							<HorizontalDivider />
							<div className="d-flex justify-content-center flex-column">
								<div className="row mt-5">
									<div className="col-6 text-start">
										<Paragraph size="18px" bold>Buyer</Paragraph>
										<div className="d-flex">
											<IconPrimaryCta className="material-icons">person</IconPrimaryCta>
											<Link to={`/profile/user/${buyerID}`} params={{ buyerID }} style={{ textDecoration: 'none' }}>
												<Paragraph size="18px" bold color="primary_cta">{userNameBuyer}</Paragraph>
											</Link>
										</div>
										<Paragraph size="18px">Buyer Feedback Here</Paragraph>
										<Paragraph size="18px">Buyer Register Date Here</Paragraph>
										<Paragraph size="18px">Total Trades Here</Paragraph>
									</div>
									<div className="col-6">
										<Paragraph size="18px">How was the buyer?</Paragraph>
										<FeedbackContext.Provider value={value}>
											<GiveFeedback />
										</FeedbackContext.Provider>
										<div className="d-flex flex-column text-start mt-4">
											<StyledLabel bold htmlFor="feedbackMessage">Feedback Comment</StyledLabel>
											<TextArea
												type="text"
												placeholder=""
												value={feedbackMessage}
												name="feedbackMesage"
												id="feedbackMessage"
												className="me-3"
												onChange={(event) => {
													setFeedbackMessage(event.target.value);
												}}
											/>
										</div>
									</div>
									<div className="col-12 mt-3">
										<PrimaryButton
											text="Complete Trade"
											className="w-100"
											onClick={() => null}
											disabled={feedBack.length > 0 && feedbackMessage.length === 0}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					)}
				</div>
			</div>
		</PageBody>
	);
};

export default Selling;
