import React from "react";
import { Navigate, useNavigate } from "react-router";
import styled, { css, keyframes } from 'styled-components';
import PrimaryButton from "../Components/Buttons";
import Heading from "../Components/Heading";

const Jump = keyframes`
    0% { transform: translate(0px, 0px); }
    50% { transform: translate(0px, -60px); }
    100% { transform: translate(0px, 0px); }
`;

const TradeCompleteIcon = styled.i(({ theme }) => css`
    font-size: 168px;
    color: ${theme.colors.valid};
    animation: ${Jump} 0.5s linear 1;
`);

const ShortPageBody = styled.div(({ theme }) => css`
    min-height: 50vh;
    background: ${theme.colors.base_bg};
`);

const ErrorPage = () => {
    const navigate = useNavigate();
    return(
        <ShortPageBody className="d-flex align-items-center justify-content-center flex-column py-5">
            <TradeCompleteIcon className="material-icons mb-3">check_circle</TradeCompleteIcon>
            <Heading bold size="48px" className="mb-5">Trade Complete!</Heading>
            <PrimaryButton text="Go to trade history" onClick={() => navigate(`/TradeHistory/Completed?ref=hithere`)} />
        </ShortPageBody>
    )
};

export default ErrorPage;