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

const convertCurrencyToSymbol = (currency) => {
  if (currency === "GBP") {
    return "£";
  }
  if (currency === "USD") {
    return "$";
  }
};

const HighlightedText = styled.span(
  ({ theme }) => css`
    color: ${theme.colors.primary_cta};
  `
);

const ChatWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    max-height: 700px;
    overflow-y: auto;

    .message {
      border-radius: 20px 20px 0 20px;
      background: ${theme.colors.grey};
      padding: 10px 20px;
      font-size: 18px;
      margin-bottom: 28px;
      width: auto;
      display: flex;
      justify-content: flex-end;
      align-self: flex-end;

      &.self {
        border-radius: 0px 20px 20px 20px;
        background: ${theme.colors.primary_cta};
        color: ${theme.colors.base_bg};
        justify-content: flex-start;
        align-self: flex-start;
      }
    }
  `
);

const ButtonBase = styled.div(
  ({ theme, fontSize, borderSize }) => css`
    border-radius: 50px;
    padding: 3px;
    background: rgba(46, 46, 46, 0.5);
    background: linear-gradient(
      90deg,
      ${theme.colors.gradients.yellow} 0%,
      ${theme.colors.gradients.peach} 33%,
      ${theme.colors.gradients.mauve} 66%,
      ${theme.colors.gradients.blue} 100%
    );

    .innerButton {
      background: ${theme.colors.grad_button2};
      margin: ${borderSize};
      border-radius: 50px;
      font-size: ${fontSize};
      padding: 10px;
      color: ${theme.colors.actual_white};
      border: 0;

      &:disabled {
        opacity: 0.7;
      }
    }
  `
);

const SendButton = ({
  icon,
  className,
  onClick,
  value,
  type,
  fontSize,
  disabled,
}) => (
  <ButtonBase
    fontSize={fontSize}
    className={`d-inline-flex ${className ? className : ""}`}
  >
    <button
      className="innerButton d-flex align-items-center jusityf-content-center"
      onClick={onClick}
      value={value}
      type={type}
      fontSize={fontSize}
      disabled={disabled}
    >
      <i className="material-icons">{icon}</i>
    </button>
  </ButtonBase>
);

const solQuantity = 2;

const Trade = () => {
  const [solGbp, setSolGbp] = useState("");

  const [registeredDate, setRegisteredDate] = useState("");
  const [feedbackScore, setFeedbackScore] = useState("");
  const [escrowReleaseTime, setEscrowReleaseTime] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showChat, setShowChat] = useState(false);
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
    if (val.userName !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = async () => {
    console.log(currentMessage);
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: val.userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
	  setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  //console.log(messageList, 'message list');
  //console.log(currentMessage, 'current message');

  return (
    <PageBody>
      {pageMode === "buy" && (
        <div className="container">
          <div className="row pt-5">
            <div className="col-12 mb-5 pb-5">
              <Heading size="26px" className="mb-4">
                Offers &gt; Buy SOL from {val.userName} with{" "}
                {val.paymentMethod1}.
              </Heading>
            </div>
            <div className="col-12 col-md-6 row">
              {/*	{!showChat ? (  */}
              <ChatWrapper>
                <div className="chat-header">
                  <Paragraph>Conversation</Paragraph>
                  <ScrollToBottom className="">
                    {messageList.map((messageContent) => {
                      return (
                        <div
                          className="message"
                          id={
                            username === messageContent.author ? "you" : "other"
                          }
                        >
                          <div>
                            <div className="message-content">
                              <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                              <p id="time">{messageContent.time}</p>
                              <p id="author">{messageContent.author}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </ScrollToBottom>
                </div>

                <div className="chat-footer d-flex align-items-center">
                  <TextArea
                    type="text"
					value={currentMessage}
                    placeholder="Enter message here"
                    onChange={(event) => {
                      setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                      event.key === "Enter" && sendMessage();
                    }}
                  />
                  <SendButton
                    icon="send"
                    onClick={() => {
                      joinRoom();
                      sendMessage();
                    }}
                  />
                </div>
              </ChatWrapper>
              {/*	) : ( 
									<Chat socket={socket} username={val.username} room={room} />
						)} */}
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
                <Paragraph size="18px" className="pb-3">
                  1 SOL = {convertCurrencyToSymbol(state.currency)}
                  {state.solGbp}
                </Paragraph>
                <HorizontalDivider />
                <div className="d-flex justify-content-center flex-column">
                  <Paragraph bold size="24px" className="me-2">
                    Please pay {convertCurrencyToSymbol(state.currency)}{" "}
                    {state.solGbp * solQuantity}
                  </Paragraph>
                  <Paragraph size="18px" className="me-2">
                    into
                  </Paragraph>
                  <Card className="p-3 mb-4">Bank Details Here</Card>
                  <div className="d-flex text-start">
                    <FormCheckbox
                      type="checkbox"
                      id="checkedPayment"
                      name="checkedPayment"
                      className="me-4"
                    />
                    <StyledLabel className="p-0" htmlFor="checkedPayment">
                      <HighlightedText className="me-1">YES!</HighlightedText> I
                      have sent the payment to the seller.
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
                Offers &gt; Sell SOL to {val.userName} with {val.paymentMethod1}
                .
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
                      <HighlightedText className="me-1">YES!</HighlightedText> I
                      have confirmed that payment from the buyer is received and
                      checked.
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

export default Trade;
