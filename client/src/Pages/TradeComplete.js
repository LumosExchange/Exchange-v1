import React from "react";
import styled, { css, keyframes } from 'styled-components';
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

const ErrorPage = () => (
    <ShortPageBody className="d-flex align-items-center justify-content-center flex-column py-5">
        <TradeCompleteIcon className="material-icons mb-3">check_circle</TradeCompleteIcon>
        <Heading bold size="48px">Trade Complete!</Heading>
    </ShortPageBody>
);

export default ErrorPage;