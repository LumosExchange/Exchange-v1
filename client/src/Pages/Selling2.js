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
			// justify-content: flex-end;
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

const PaymentInfoArea = ({ paymentInfo, paymentMethod, reference }) => (
	<Card className="p-3 mb-4 d-flex flex-column" color="grey">
		<Paragraph>The buyer will transfer funds using the following details:</Paragraph>
		<Paragraph size="24px" bold color="primary_cta">
			{paymentMethod}
		</Paragraph>
		{paymentInfo.data?.name && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					Name:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{paymentInfo.data.name}
				</Paragraph>
			</div>
		)}
		{paymentInfo.data?.sortCode && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					Sort:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{paymentInfo.data.sortCode}
				</Paragraph>
			</div>
		)}
		{paymentInfo.data?.accountNumber && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					Acc No:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{paymentInfo.data.accountNumber}
				</Paragraph>
			</div>
		)}
		{reference && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					Ref:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{reference}
				</Paragraph>
			</div>
		)}
		{paymentInfo.data?.email && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					Sort:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{paymentInfo.data.email}
				</Paragraph>
			</div>
		)}
		{paymentInfo.data?.email && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					Email:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{paymentInfo.data.email}
				</Paragraph>
			</div>
		)}
		{paymentInfo.data?.bankName && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					Bank Name:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{paymentInfo.data.bankName}
				</Paragraph>
			</div>
		)}
		{paymentInfo.data?.bankCity && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					Bank City:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{paymentInfo.data.bankCity}
				</Paragraph>
			</div>
		)}
		{paymentInfo.data?.IBAN && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					IBAN:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{paymentInfo.data.IBAN}
				</Paragraph>
			</div>
		)}
		{paymentInfo.data?.BIC && (
			<div className="d-flex justify-content-center">
				<Paragraph bold size="20px" className="me-2">
					BIC/SWIFT:
				</Paragraph>
				<Paragraph className="text-uppercase" size="20px">
					{paymentInfo.data.BIC}
				</Paragraph>
			</div>
		)}
	</Card>
);

const socket = io.connect("http://localhost:3002");

const Selling2 = ({ userName }) => {
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

	const { state } = useLocation();
	const liveTradeID = state.liveTradeID;
	console.log(state, "st8");

	console.log(reference, "reference?");

	const navigate = useNavigate();

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

	useEffect(() => {
		getTradeDetails();
		joinRoom();

		socket.on("recieve_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);

	console.log(paymentInfo, "payment info");

	const formattedCurrency = convertCurrencyToSymbol(paymentCurrency);

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
													userName !== messageContent.author
														? "d-flex justify-content-end align-self-end"
														: "d-flex justify-content-start align-self-start"
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
									<FormCheckbox
										type="checkbox"
										id="checkedPayment"
										name="checkedPayment"
										className="me-4"
									/>
									<StyledLabel className="p-0" htmlFor="checkedPayment">
										<HighlightedText className="me-1">YES!</HighlightedText> I recieved the payment
										from the buyer.
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

export default Selling2;
