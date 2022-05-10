import React from "react";
import { useNavigate, useLocation } from "react-router";
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

const AccountRegistered = () => {
    const { state } = useLocation();
    console.log(state, 'state');
    const userEmail = state.email;
    const navigate = useNavigate();
    return(
        <ShortPageBody className="d-flex align-items-center justify-content-center flex-column py-5">
            <TradeCompleteIcon className="material-icons mb-3">check_circle</TradeCompleteIcon>
            <Heading bold size="48px" className="mb-5">Account Registered!</Heading>
            <PrimaryButton text="Go to Verification" onClick={() => navigate("/EmailVerification", {
              state: {
                userEmail,
              },
            })} />
        </ShortPageBody>
    )
};

export default AccountRegistered;