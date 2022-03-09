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

const HighlightedText = styled.span(
	({ theme }) => css`
		color: ${theme.colors.primary_cta};
	`
);

const ChatWrapper = styled.div(
	({ theme }) => css`
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
	`
);

const solQuantity = 2;

const socket = io.connect("http://localhost:3002");

const Selling = ({ userName }) => {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [paymentInfo, setPaymentInfo] = useState([]);
	const [room, setRoom] = useState("");
	const [userNameSeller, setUserNameSeller] = useState("");
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

	const { state } = useLocation()
	const liveTradeID = state.liveTradeID;
	const { val } = state;

	const navigate = useNavigate();

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

	//chat stuff here
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

	useEffect(() => {
		getTradeDetails();
		joinRoom();
		socket.on("recieve_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);



	return (
		<PageBody>
			<div className="container">
				<div className="row pt-5">
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
													userName === messageContent.author
														? "message self justify-content-start align-self-start"
														: "message justify-content-end align-self-end"
												}
											>
												<Paragraph size="16px" className="mb-0 me-2" bold>
													{messageContent.author}
												</Paragraph>
												<Paragraph size="16px" className="mb-0">
													{messageContent.time}
												</Paragraph>
											</div>
											<div
												className={
													userName === messageContent.author
														? "message self justify-content-start align-self-start"
														: "message justify-content-end align-self-end"
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
									//	joinRoom();
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
					<div className="col-12 col-md-5 row mt-4">
						<div className="col-12 text-center">
							<div className="d-flex">
								<Heading className="me-2">Selling</Heading>
								<Heading bold>{solQuantity} SOL</Heading>
								<Heading className="mx-2">for</Heading>
								<Heading bold>
									{convertCurrencyToSymbol(state.currency)}
									{state.solGbp * solQuantity}
								</Heading>
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
		</PageBody>
	);
};

export default Selling;
