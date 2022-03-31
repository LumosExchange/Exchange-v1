import React, { useState, useEffect, createContext, useMemo } from "react";
import styled, { css } from "styled-components";
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
} from "../Components/TradeComponents";
import { Link } from "react-router-dom";
import { StyledCode } from "./Profile/Wallets";
import { Warning } from "./Register";

const socket = io.connect("http://localhost:3002");

const Buying = ({ userName }) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [paymentInfo, setPaymentInfo] = useState([]);
	const [room, setRoom] = useState("");
	const [userNameSeller, setUserNameSeller] = useState("");
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
	const [currentStep, setCurrentStep] = useState("buying");
	const [isPaymentSent, setIsPaymentSent] = useState(false);
	const [registerdDate, setRegisteredDate] = useState("");
	const [feedbackScore, setFeedbackScore] = useState("");
	const [totalTrades, setTotalTrades] = useState("");
	const [feedbackMessage, setFeedbackMessage] = useState("");
	const [feedBack, setFeedback] = useState("");
	const [walletAddress, setWalletAddress] = useState("");
	const [confirmation, setConfirmation] = useState(false);
	const [saleID, setSaleID] = useState("");

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
			})
			.then((response) => {
				//Can map all details needed here from the response get seller ID and payment method from response
				setReference(response.data[0].Reference);
				setSaleID(response.data[0].saleID);

				setRoom(response.data[0].Reference);
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

				axios
					.get("http://localhost:3001/GetLiveTradePaymentInfo", {
						params: {
							sellerID: response.data[0].sellerID,
							paymentMethod: response.data[0].paymentMethod,
						},
					})
					.then((response2) => {
						setPaymentInfo(response2);

						axios
							.get("http://localhost:3001/getUserNameSeller", {
								params: {
									sellerID: response.data[0].sellerID,
								},
							})
							.then((response3) => {
								setUserNameSeller(response3.data[0].userName);

								const messageData = {
									room: response.data[0].Reference,
									author: userName,
									message: response.data[0].Message,
									time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
								};
								socket.emit("send_message", messageData);
								setMessageList((list) => [...list, messageData]);
								setCurrentMessage("");
							});

						axios
							.get("http://localhost:3001/GetTradeFeedbackInfo", {
								params: {
									UserID: response.data[0].sellerID,
								},
							})
							.then((response4) => {
								setRegisteredDate(
									response4.data.registeredDate.replace("T", " at ").replace(".000Z", " ")
								);
								setTotalTrades(response4.data.totalTrades);
								setFeedbackScore(response4.feedbackScore);
							});
					});
			});
	};

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
						message: "Please note " + userName + " has confirmed they have sent the payment",
						time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
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

	const convertFeedbackToInteger = (feedBack) => {
		if (feedBack === "Positive") {
			return 3;
		}
		if (feedBack === "Neutral") {
			return 2;
		}
		if (feedBack === "Negaitve") {
			return 3;
		}
	};

	const completeTrade = () => {
		const formattedFeedBack = convertFeedbackToInteger(feedBack);
		//get feedback and send to db
		axios
			.post("http://localhost:3001/CompleteTrade", {
				liveTradeID,
				saleID,
				feedbackMessage,
				formattedFeedBack,
				sellerID,
				buyerID,
				solAmount,
			})
			.then((response) => {});
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
		};
	}, [feedBack, setFeedback]);

	useEffect(() => {
		getTradeDetails();
		joinRoom();

		if (paymentSentSetter === "YES") {
			setCurrentStep("transfer");
		} else {
			setCurrentStep("buying");
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
							Offers &gt; Buy SOL from {userNameSeller} with {paymentMethod}.
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
									onKeyPress={(event) => {
										event.key === "Enter" && sendMessage() && setCurrentMessage("");
									}}
								/>
								<SendButton
									icon="send"
									onClick={() => {
										sendMessage();
										setCurrentMessage("");
									}}
									disabled={currentMessage === ""}
								/>
							</div>
						</ChatWrapper>
					</div>
					<div className="col-1 d-flex justify-content-center">
						<VerticalDivider />
					</div>
					{currentStep === "buying" && (
						<div className="col-12 col-md-5">
							<HalfStepper step2Title="Send Payment to the Seller" />
							<div className="col-12 text-center">
								<Heading className="me-2 d-inline-block">Buying</Heading>
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
										Please pay {formattedCurrency}
										{fiatAmount}
									</Paragraph>
									<Paragraph size="18px" className="me-2">
										into
									</Paragraph>
									<PaymentInfoArea
										paymentInfo={paymentInfo}
										paymentMethod={paymentMethod}
										reference={reference}
									/>
									<div className="d-flex text-start">
										<PrimaryButton
											text={isPaymentSent ? "Payment marked as sent" : "I've sent the payment"}
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
												onClick={sentPayment}
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
								<Heading className="me-2 d-inline-block mb-4">Check your wallet</Heading>
								<Heading bold className="d-inline-block">
									{solAmount} SOL
								</Heading>
								<Paragraph size="18px">Should have been sent to the wallet addresss:</Paragraph>
								<StyledCode>{walletAddress}</StyledCode>
								<HorizontalDivider />
								<div className="d-flex align-items-center py-3">
									<Warning />
									<Paragraph className="mb-0 text-start" size="18px">
										Please double and triple check your wallet address before confirming. Do not mark as SOL received until the funds are in your wallet.
									</Paragraph>
								</div>
								<div className="d-flex align-items-center mb-4 pt-3">
									<FormCheckbox type="checkbox" id="solReceived" name="solReceived" onChange={(e) => setConfirmation(e.target.checked) } />
									<StyledLabel htmlFor="solReceived">I've received the SOL to my wallet address.</StyledLabel>
								</div>
								<div className="d-flex justify-content-center flex-column">
									<div className="col-12">
										<PrimaryButton
											text="Continue"
											className="w-100 mt-3"
											onClick={() => setCurrentStep("bought")}
											disabled={!confirmation}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
					{currentStep === "bought" && (
						<div className="col-12 col-md-5 mt-4">
							<Stepper step2Title="Send Payment to the Seller" />
							<div className="col-12 text-center">
								<Heading className="me-2 d-inline-block">Bought</Heading>
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
											<Paragraph size="18px" bold>
												Seller
											</Paragraph>
											<div className="d-flex">
												<IconPrimaryCta className="material-icons">person</IconPrimaryCta>
												<Link
													to={`/profile/user/${sellerID}`}
													params={{ sellerID }}
													style={{ textDecoration: "none" }}
												>
													<Paragraph size="18px" bold color="primary_cta">
														{userNameSeller}
													</Paragraph>
												</Link>
											</div>
											<Paragraph size="18px">Feedback Score {feedbackScore}</Paragraph>
											<Paragraph size="18px">Registered Date {registerdDate}</Paragraph>
											{console.log(totalTrades, "total trades?")}
											<Paragraph size="18px">Total Trades {totalTrades}</Paragraph>
										</div>
										<div className="col-6">
											<Paragraph size="18px">How was the seller?</Paragraph>
											<FeedbackContext.Provider value={value}>
												<GiveFeedback />
											</FeedbackContext.Provider>
											<div className="text-start">
												<StyledLabel
													htmlFor="feedbackMessage"
													bold
													className="mt-3"
													padding="0"
												>
													Feedback Message
												</StyledLabel>
												<TextArea
													type="text"
													placeholder=""
													name="feedbackMessage"
													id="feedbackMessage"
													value={feedbackMessage}
													className="me-3"
													onChange={(event) => {
														setFeedbackMessage(event.target.value);
													}}
												/>
											</div>
										</div>
										<div className="col-12">
											<PrimaryButton
												text="Complete Trade"
												className="w-100 mt-3"
												onClick={() => completeTrade()}
												disabled={feedBack.length === 0 || feedbackMessage.length === 0}
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

export default Buying;
