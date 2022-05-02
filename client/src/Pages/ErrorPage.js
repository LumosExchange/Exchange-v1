import React from "react";
import styled, { css } from 'styled-components';
import Heading from "../Components/Heading";

const NotFoundIcon = styled.i(({ theme }) => css`
    font-size: 120px;
    color: ${theme.colors.primary_cta};
`);

const ShortPageBody = styled.div(({ theme }) => css`
    min-height: 50vh;
    background: ${theme.colors.base_bg};
`);

const ErrorPage = () => (
    <ShortPageBody className="d-flex align-items-center justify-content-center flex-column py-5">
        <NotFoundIcon className="material-icons mb-3">travel_explore</NotFoundIcon>
        <Heading bold size="48px">404</Heading>
        <Heading bold size="24px" className="mb-4">Page not found.</Heading>
    </ShortPageBody>
);

export default ErrorPage;