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
import { AppUrl } from "../App";

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
      height: 98%;
      width: 1px;
      opacity: 0.2;
    }
  `
);

const YellowIcon = styled.i(
  ({ theme }) => css`
    color: ${theme.colors.primary_cta};
  `
);

const MissingIcon = styled.i(
  ({ theme }) => css`
    font-size: 120px;
    color: ${theme.colors.primary_cta};
  `
);

const Offer = ({ solGbp, solUsd, currency }) => {
  const [offerAmount, setOfferAmount] = useState("");
  const [offerAmountInSol, setOfferAmountInSol] = useState("");
  const [offerAmountInCurrency, setOfferAmountInCurrency] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [conversionMode, setConversionMode] = useState("FIATtoSOL");
  const [paymentMethod, setPaymentMethod] = useState("Please Select");
  const [registeredDate, setRegisteredDate] = useState("");
  const [feedbackScore, setFeedbackScore] = useState("");
  const [escrowReleaseTime, setEscrowReleaseTime] = useState("");
  const [listingPrice, setListingPrice] = useState(0.0);
  const [userWallets, setUserWallets] = useState([]);
  const [wallet, setWallet] = useState("Please Select");
  const [data, setData] = useState([]);

  const { state } = useLocation();
  const navigate = useNavigate();

  const getListingPrice = () => {
    if (data.aboveOrBelow === "above") {
      const listingPrice = (solGbp / 100) * (100 + data.percentChange);
      setListingPrice(listingPrice.toFixed(2));
    } else {
      const listingPrice = (solGbp / 100) * (100 - data.percentChange);
      setListingPrice(listingPrice.toFixed(2));
    }
  };

  const convertAmountToSOL = (amount) => {
    const convertedAmount = amount / listingPrice;
    setOfferAmountInSol(convertedAmount);
  };

  const convertSolToAmount = (amount) => {
    if (listingPrice !== 0.0) {
      const convertedAmount2 = listingPrice * amount;
      setOfferAmountInCurrency(convertedAmount2);
    }
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
    Axios.post(`${AppUrl}/GetSellerInfo`, {
      sellerID: data.userID,
    }).then((response) => {
      setRegisteredDate(response.data.registeredDate[0].registeredDate);
      setFeedbackScore(response.data.feedbackScore[0].feedbackScore);
      setEscrowReleaseTime(
        response.data.escrowReleaseTime[0].escrowReleaseTime
      );
    });
  };

  const getUserWallets = () => {
    Axios.post(`${AppUrl}/GetWallets`, {}).then((response) => {
      if (!response.data.code) {
        const formattedWallets = response.data.filter(
          (fw) => fw.address.length > 1
        );
        setUserWallets(formattedWallets);
      } else {
      }
    });
  };

  const openTrade = () => {
    Axios.post(`${AppUrl}/OpenTrade`, {
      saleID: data.saleID,
      sellerID: data.userID,
      paymentMethod: paymentMethod,
      userSolPrice: solGbp,
      amountOfSol: offerAmountInSol,
      fiatAmount: offerAmount || offerAmountInCurrency,
      paymentCurrency: currency,
      message: offerMessage,
      walletAddress: wallet,
    }).then((response) => {
      if (response.status === 200) {
        navigate("/Buying", {
          state: {
            liveTradeID: response.data.insertId,
          },
        });
      }
    });
  };

  useEffect(() => {
    getListingPrice();
    getUserWallets();

    if (data && data.length > 0) {
      getUserWallets();
    }

    if (!registeredDate && data.userID) {
      getSellerInfo();
    }

    if (state && state !== null) {
      setData(state.val);
    }
  }, [data, state, registeredDate]);

  const filteredPaymentMethods = [
    "Please Select",
    data.paymentMethods && data.paymentMethods[0],
    data.paymentMethods && data.paymentMethods[1],
  ];
  const formattedCurrency = convertCurrencyToSymbol(currency);

  return data.length === 0 ? (
    <PageBody className="d-flex justify-content-center flex-column">
      <div className="container text-center">
        <MissingIcon className="material-icons mb-3">manage_search</MissingIcon>
        <Paragraph size="20px">Trade info missing!</Paragraph>
        <Paragraph size="20px">
          Please navigate from a valid trade card
        </Paragraph>
      </div>
    </PageBody>
  ) : (
    <PageBody>
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 mb-4">
            <InvisibleButton
              className="d-flex align-items-center"
              onClick={() => navigate("/Buy")}
            >
              <YellowIcon className="material-icons me-2">
                arrow_back
              </YellowIcon>
              <Paragraph size="20px" className="mb-0" color="primary_cta">
                Back to Buy
              </Paragraph>
            </InvisibleButton>
          </div>
          <div className="col-12 mb-5 pb-5">
            <Heading size="26px" className="mb-4">
              Buy SOL from {data.userName} with {data.paymentMethods && data.paymentMethods[0]}{" "}
              {data.paymentMethods && `or ${data.paymentMethods[1]}`}.
            </Heading>
            <TradeCard
              val={data}
              withoutButton
              solGbp={solGbp}
              currency={currency}
              listingPrice={listingPrice}
            />
          </div>
          <div className="col-12 col-md-6 d-flex flex-column flex-md-row">
            <div
              className="col-2 d-flex align-items-center"
              style={{ maxHeight: "200px" }}
            >
              <SwitchButton
                className="d-flex align-items-center justify-content-center"
                onClick={switchConversionMode}
              >
                <i className="material-icons">import_export</i>
              </SwitchButton>
            </div>
            <div className="col-12 col-md-10" style={{ marginBottom: "100px" }}>
              <StyledLabel padding="0 0 10px 0" bold htmlFor="offerAmount">
                Offer Amount
              </StyledLabel>
              {conversionMode === "FIATtoSOL" && (
                <React.Fragment>
                  <FormInput
                    type="number"
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
                <StyledLabel
                  padding="0 0 10px 0"
                  bold
                  htmlFor="preferredPayment"
                >
                  Select Payment Method
                </StyledLabel>
                <StyledDropdown
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
              <div className="w-100 pt-2 pb-3 mt-3">
                <StyledLabel padding="0 0 10px 0" bold htmlFor="payToWallet">
                  Select Wallet
                </StyledLabel>
                <StyledDropdown
                  placeholder="payToWallet"
                  name="payToWallet"
                  id="payToWallet"
                  color="btn"
                  onChange={(e) => {
                    setWallet(e.target.value);
                  }}
                  className="w-100"
                  required
                >
                  <option value="Please Select">Please Select</option>
                  {userWallets.map((option) => (
                    <option value={option.address}>{option.address}</option>
                  ))}
                </StyledDropdown>
              </div>
              <div className="w-100 p-0 mt-3">
                <GradientButton
                  text="Open Trade"
                  fontSize="24px"
                  padding="4px 20px"
                  className="w-100"
                  onClick={() => openTrade()}
                  disabled={
                    offerMessage.length === 0 ||
                    paymentMethod === "Please Select" ||
                    offerAmountInSol.length === 0 ||
                    wallet === "Please Select"
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-1 d-flex justify-content-center">
            <VerticalDivider className="d-none d-md-block" />
          </div>
          <div className="col-12 col-md-5 row mt-4 pb-5">
            <div className="col-12 text-center pb-5">
              <Heading bold>
                1 SOL = {formattedCurrency}
                {listingPrice}
              </Heading>
              <Paragraph size="18px" className="pb-3">
                SOL/GBP rate is secured for 120 seconds.
              </Paragraph>
              <HorizontalDivider />
            </div>
            <div className="col-6">
              <Paragraph bold>About the Trader</Paragraph>
              <div className="d-flex mb-2">
                <YellowIcon className="material-icons me-1">person</YellowIcon>
                <Paragraph
                  color="primary_cta"
                  size="20px"
                  bold
                  className="mb-0"
                >
                  {data.userName}
                </Paragraph>
              </div>
              <Paragraph>
                Feedback score: {((feedbackScore * 100) / 3).toFixed(2)}
                {"%"}
              </Paragraph>
              <Paragraph>Total Trades: {data.tradeHistory}</Paragraph>
              <Paragraph>
                Average Trade Time: {(escrowReleaseTime / 60).toFixed(2)}
                {" Mins"}
              </Paragraph>
              <Paragraph>
                {console.log(registeredDate)}
                Registered: {new Date(registeredDate).toString().split("T", 1)}
              </Paragraph>
            </div>
            <div className="col-6">
              <Paragraph bold>Headline</Paragraph>
              <Card className="p-3 mb-4">
                Paypal, Wise supported. Quick response!
              </Card>
              <Paragraph bold>Payment Methods</Paragraph>
              <Paragraph className="mb-0">
                &bull; {data.paymentMethods && data.paymentMethods[0]}
              </Paragraph>
              <Paragraph>
                &bull; {data.paymentMethods && data.paymentMethods[1]}
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </PageBody>
  );
};

export default Offer;
