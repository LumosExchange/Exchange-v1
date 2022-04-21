import React, { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import Axios from "axios";
import Card from "../Components/Card";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import GradientButton from "../Components/GradientButton";
import { useNavigate } from "react-router-dom";
import { LoadingState } from "./Profile";
import { convertCurrencyToSymbol } from "../Helpers";
import FlagUK from '../Images/flag-icons/gb.png';
import { Link } from "react-router-dom";
import { InvisibleButton } from "./Buttons";
import { TitledIcon, Reference, ActionButton } from "./TradeComponents";

export const CardDivider = styled.hr(({ theme }) => css`
    :not([size]){
        color: ${theme.colors.text_primary};
        height: 1px;
        opacity: 0.2;
    }
`);

const FlagIcon = styled.img`
    width: 20px;
    height: 15px;
`;

const convertCountryToFlag = (country) => {
    if (country === "United Kingdom"){
        return <FlagIcon src={FlagUK} alt="UK" className="me-2" />
    }
}

const ProfileLink = styled(InvisibleButton)(({ theme }) => css`
    text-decoration: none;

    p:hover {
        text-decoration: underline;
    }

    i {
        color: ${theme.colors.primary_cta};
    }
`);

const TradeCard = ({ val, children, withoutButton, solGbp, solUsd, currency }) => {
    const navigate = useNavigate();
    const userID = val.userID;
    const userName = val.userName;

    return (
        <Card className="p-3 mb-3" color="grey">
            <div className="row">
                <div className="col-12 col-xl-3 d-flex justify-content-center flex-column mb-0">
                    <ProfileLink
                        className="d-flex align-items-center"
                        onClick={ () => navigate(`/profile/user/${userID}`, {
                            state: {
                                userID,
                                userName,
                            }
                        })}
                    >
                        <Paragraph size="24px" bold color="primary_cta" className="mb-0">
                            {val.userName}
                        </Paragraph>
                    </ProfileLink>
                </div>
                <div className="col-12 col-xl-4 d-flex align-items-center mb-0">
                    {convertCountryToFlag(val.Country)}
                    <Paragraph size="18px" className="mb-0 text-truncate overflow-hidden">{val.Town}, {val.Country}</Paragraph>
                </div>
                <div className="col-12 col-xl-2 d-flex align-items-center justify-content-xl-end mb-3 mb-xl-0">
                    <Paragraph size="18px" className="mb-0">{val.amountForSale} for sale</Paragraph>
                </div>
                <div className="d-block d-xl-none">
                    <CardDivider />
                </div>
                <div className="col-12 col-xl-3 d-flex flex-column align-items-xl-end mb-3 mb-xl-0">
                    <Heading size="24px" bold color="primary_cta" className="mb-0">
                        {convertCurrencyToSymbol(currency)}{val.aboveOrBelow === 'above' && ((solGbp / 100) * (100 + val.percentChange)).toFixed(2)}
                        {val.aboveOrBelow === 'below' && ((solGbp / 100) * (100 - val.percentChange)).toFixed(2)}
                    </Heading>
                    <Paragraph size="16px" className="mb-0">
                        {val.percentChange}%
                        {' '}{val.aboveOrBelow}{' '}market
                    </Paragraph>
                </div>
                <div className="col-12 col-xl-3 d-flex align-items-center">
                    <div className="d-flex">
                        <i className="material-icons me-2">swap_horiz</i>
                        <Paragraph size="16px" className="mb-0">
                            {val.tradeHistory}{' '}{val.tradeHistory === 1 ? 'Trade' : 'Trades'}
                        </Paragraph>
                    </div>
                </div>
                <div className="col-12 col-xl-6 d-flex align-items-center mb-3 mb-xl-0">
                    <i className="material-icons me-2">account_balance_wallet</i>
                    <Paragraph size="18px" className="mb-0 overflow-hidden text-truncate">
                        {val.paymentMethod1}{' & '}{val.paymentMethod2}
                    </Paragraph>
                </div>
                {!withoutButton && (
                    <div className="col-12 col-xl-3 d-flex align-items-end pt-3">
                        <GradientButton
                            text="Buy"
                            fontSize="24px"
                            padding="4px 20px"
                            className="w-100"
                            onClick={ () => navigate("/Offer", {
                                state: {
                                    val,
                                    currency,
                                }
                            })}
                        />
                    </div>
                )}
                {children}
            </div>
        </Card>
    );
}

export default TradeCard;

export const ActiveTradeCard = ({ tradeInfo, type, noButtons, noMessage }) => {
    const formattedDate = Date(tradeInfo.Date).split("GMT", 1);
	const formattedCurrencySymbol = convertCurrencyToSymbol(tradeInfo.paymentCurrency);
	const liveTradeID = tradeInfo.LiveTradeID;
	const paymentSent = tradeInfo.paymentRecieved;

	const navigate = useNavigate();

	return (
		<Card className="w-100 p-4 mb-3" color="grey" key={tradeInfo.Reference}>
			<div className="row">
				<div className="col-12 col-lg-3">
					<div className="d-flex flex-column">
						<Heading bold size="22px" className="text-start mb-3">
							MetaData
						</Heading>
						<div className="d-flex">
							<TitledIcon className="material-icons me-2" title="Reference">
								tag
							</TitledIcon>
							<Paragraph size="18px" className="me-2">
								{tradeInfo.HistoryID ? tradeInfo.HistoryID : tradeInfo.LiveTradeID}
							</Paragraph>
						</div>
						<div className="d-flex">
							<TitledIcon className="material-icons me-2" title="Date/Time Created">
								schedule
							</TitledIcon>
							<Paragraph size="18px" className="me-2 text-start">
								{formattedDate}
							</Paragraph>
						</div>
						{!noMessage && tradeInfo.Message && (
							<div className="d-flex">
								<TitledIcon className="material-icons me-2" title="Message from Seller">
									message
								</TitledIcon>
								<Paragraph size="18px" className="mb-0 overflow-hidden text-truncate">
									{tradeInfo.Message}
								</Paragraph>
							</div>
						)}
					</div>
				</div>
				<div className="col-12 d-lg-none">
					<CardDivider />
				</div>
				<div className="col-12 col-lg-3">
					<Heading bold size="22px" className="text-start mb-3">
						Price/Coin Data
					</Heading>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Rate:
						</Paragraph>
						<Paragraph size="18px" className="mb-0">
							{formattedCurrencySymbol}
							{tradeInfo.userSolPrice} per SOL
						</Paragraph>
					</div>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Amount:
						</Paragraph>
						<Paragraph size="18px" className="mb-2">
							{tradeInfo.amountOfSol}
						</Paragraph>
					</div>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Total:
						</Paragraph>
						<Paragraph size="18px" className="mb-0">
							{formattedCurrencySymbol}
							{tradeInfo.fiatAmount}
						</Paragraph>
					</div>
				</div>
				<div className="col-12 d-lg-none">
					<CardDivider />
				</div>
				<div className="col-12 col-lg-3 mb-4 mb-md-0">
					<Heading bold size="22px" className="text-start mb-3">
						Payment Data
					</Heading>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Method:
						</Paragraph>
						<Paragraph size="18px" className="mb-2">
							{tradeInfo.paymentMethod}
						</Paragraph>
					</div>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Payment:
						</Paragraph>
						<Paragraph size="18px" className="mb-2">
							{tradeInfo.paymentRecieved === "NO" ? "Not yet paid" : "Mark as Paid"}
						</Paragraph>
					</div>
					<div className="d-flex">
						<Paragraph size="18px" bold className="me-2">
							Ref:
						</Paragraph>
						<Reference size="18px" className="mb-2">
							{tradeInfo.Reference}
						</Reference>
					</div>
				</div>
				<div className="col-12 col-lg-3 d-flex align-items-end justify-content-end flex-column">
					<ActionButton
						className="w-100 mb-2"
						fontSize="20px"
						color="primary_cta"
						textColor="actual_white"
						disabled={noButtons}
						onClick={() =>
							navigate(type === "buying" ? "/Buying" : "/Selling", {
								state: {
									liveTradeID,
									paymentSent,
								},
							})
						}
					>
						View Trade
					</ActionButton>
				</div>
			</div>
		</Card>
	);
};