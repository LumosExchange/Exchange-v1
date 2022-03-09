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

export const CardDivider = styled.hr(({ theme }) => css`
    :not([size]){
        color: ${theme.colors.text_primary};
        height: 1px;
        opacity: 0.2;
    }
`);

const TradeCard = ({ val, children, withoutButton, solGbp, solUsd, currency }) => {
    const navigate = useNavigate();
    console.log(solGbp, 'sol price');

    return (
        <Card className="p-4 mb-3" color="grey">
            <div className="row">
                <div className="col-12 col-xl-3 d-flex justify-content-center flex-column mb-0 mb-xl-4">
                    <div className="d-flex">
                        <i className="material-icons me-2">person</i>
                        <Heading size="24px" bold className="mb-0">
                            {val.userName}
                        </Heading>
                    </div>
                    <div className="d-flex">
                        <i className="material-icons me-2">swap_horiz</i>
                        <Paragraph size="16px" className="mb-0">
                            {val.tradeHistory}{' '}{val.tradeHistory === 1 ? 'Trade' : 'Trades'}
                        </Paragraph>
                    </div>
                </div>
                <div className="col-12 col-xl-6 d-flex align-items-center mb-0 mb-xl-4">
                    <i className="material-icons me-2">place</i>
                    <Paragraph size="18px" className="mb-0">{val.Town}, {val.Country}</Paragraph>
                </div>
                <div className="d-block d-xl-none">
                    <CardDivider />
                </div>
                <div className="col-12 col-xl-3 d-flex flex-column align-items-xl-end mb-3 mb-xl-0">
                    <Heading size="24px" bold color="primary_cta" className="mb-0">
                        {convertCurrencyToSymbol(currency)}{val.aboveOrBelow === 'above' && ((solGbp / 100) * (100 + val.percentChange)).toFixed(2)}
                        {val.aboveOrBelow === 'below' && ((solGbp / 100) * (100 - val.percentChange)).toFixed(2)}
                    </Heading>
                    <Paragraph size="16px" className="mb-0">{val.amountForSale} for sale</Paragraph>
                </div>
                <div className="col-12 col-xl-6 d-flex align-items-center mb-3 mb-xl-0">
                    <i className="material-icons me-2 align-self-start">account_balance_wallet</i>
                    <Paragraph size="18px" className="mb-0">
                        {val.paymentMethod1}{' & '}{val.paymentMethod2}
                    </Paragraph>
                </div>
                <div className="col-12 col-xl-3 d-flex align-items-center justify-content-xl-end mb-3 mb-xl-0">
                    <i className="material-icons me-2">vertical_align_center</i>
                    <Paragraph size="18px" className="mb-0">
                        {val.percentChange}%
                        {' '}{val.aboveOrBelow}{' '}market
                    </Paragraph>
                </div>
                {!withoutButton && (
                    <div className="col-12 col-xl-3 d-flex align-items-end">
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