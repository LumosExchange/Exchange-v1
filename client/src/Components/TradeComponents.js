import React, { useState, useEffect, createContext, useContext } from "react";
import styled, { css, keyframes } from "styled-components";
import Paragraph from "../Components/Paragraph";
import PropTypes from 'prop-types';
import VerifyBG from '../Images/verifybg.svg';
import ErrorBG from '../Images/errorbg.svg';
import PositiveFeedbackBG from '../Images/PositiveFeedbackBG.svg';
import NegativeFeedbackBG from '../Images/NegativeFeedbackBG.svg';
import Card from "../Components/Card";
import { InvisibleButton } from "./Buttons";

export const FeedbackContext = createContext(null);

const Step = styled.div(({ theme, background }) => css`
	width: 75px;
	height: 75px;
	border-radius: 50px;
	background: ${background};

	i {
		color: ${theme.colors.actual_white};
		font-size: 40px;
	}
`);

const StepLine = styled.div(({ theme, background }) => css`
	width: 100%;
	height: 8px;
	background: ${background};
`);

export const Stepper = ({ step1Title, step2Title, step3Title }) => (
	<div className="col-12 mb-4">
		<div className="d-flex">
			<div className="col-3 d-flex justify-content-end">
				<div className="d-flex">
					<Step
						className="d-flex align-items-center justify-content-center"
						background="linear-gradient(90deg, rgba(255,230,0,1) 0%, rgba(255,146,83,1) 80%, rgba(255,104,139,1) 100%);"
					>
						<i className="material-icons">lock</i>
					</Step>
				</div>
			</div>
			<div className="col-2 d-flex align-items-center">
				<StepLine background="linear-gradient(90deg, rgba(255,104,139,1) 0%, rgba(211,106,189,1) 100%);"/>
			</div>
			<div className="d-flex justify-content-start">
				<div className="d-flex">
					<Step
						className="d-flex align-items-center justify-content-center"
						background="linear-gradient(90deg, rgba(211,106,189,1) 0%, rgba(211,106,189,1) 100%);"
					>
						<i className="material-icons">payments</i>
					</Step>
				</div>
			</div>
			<div className="col-2 d-flex align-items-center">
				<StepLine background="linear-gradient(90deg, rgba(211,106,189,1) 0%, rgba(104,132,255,1) 100%);" />
			</div>
			<div className="col-3 d-flex justify-content-start">
				<div className="d-flex">
					<Step
						className="d-flex align-items-center justify-content-center"
						background="rgba(104,132,255,1)"
					>
						<i className="material-icons">check</i>
					</Step>
				</div>
			</div>
		</div>
		<div className="d-flex">
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">{step1Title}</Paragraph>
			</div>
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">{step2Title}</Paragraph>
			</div>
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">{step3Title}</Paragraph>
			</div>
		</div>
	</div>
);

Stepper.propTypes = {
	step1Title: PropTypes.string,
	step2Title: PropTypes.string,
	step3Title: PropTypes.string,
}

Stepper.defaultProps = {
	step1Title: "Put SOL in Escrow",
	step2Title: "Received Buyer’s Payment",
	step3Title: "Escrow Released to buyer",
}

export const HalfStepper = ({ step1Title, step2Title, step3Title }) => (
	<div className="col-12 mb-4">
		<div className="d-flex">
			<div className="col-3 d-flex justify-content-end">
				<div className="d-flex">
					<Step
						className="d-flex align-items-center justify-content-center"
						background="linear-gradient(90deg, rgba(255,230,0,1) 0%, rgba(255,146,83,1) 80%, rgba(255,104,139,1) 100%);"
					>
						<i className="material-icons">lock</i>
					</Step>
				</div>
			</div>
			<div className="col-2 d-flex align-items-center">
				<StepLine background="linear-gradient(90deg, rgba(255,104,139,1) 0%, #C4C4C4 100%);"/>
			</div>
			<div className="d-flex justify-content-start">
				<div className="d-flex">
					<Step
						className="d-flex align-items-center justify-content-center"
						background="#C4C4C4"
					>
						<i className="material-icons">payments</i>
					</Step>
				</div>
			</div>
			<div className="col-2 d-flex align-items-center">
				<StepLine background="#C4C4C4" />
			</div>
			<div className="col-3 d-flex justify-content-start">
				<div className="d-flex">
					<Step
						className="d-flex align-items-center justify-content-center"
						background="#C4C4C4"
					>
						<i className="material-icons">check</i>
					</Step>
				</div>
			</div>
		</div>
		<div className="d-flex">
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">{step1Title}</Paragraph>
			</div>
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">{step2Title}</Paragraph>
			</div>
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">{step3Title}</Paragraph>
			</div>
		</div>
	</div>
);

HalfStepper.propTypes = {
	step1Title: PropTypes.string,
	step2Title: PropTypes.string,
	step3Title: PropTypes.string,
}

HalfStepper.defaultProps = {
	step1Title: "Put SOL in Escrow",
	step2Title: "Received Buyer’s Payment",
	step3Title: "Escrow Released to buyer",
}

const PulseIcon = keyframes`
    0% { font-size: scale(1); }
    50% { transform: scale(1.2); }
	100% { transform: scale(1); }
`;

const PositiveFeedbackButton = styled.button(({ theme }) => css`
	background: ${theme.colors.valid};
	color: ${theme.colors.actual_white};
	border-radius: 20px 0 0 20px;
	border: 0;

	&.active { 
		background: url(${PositiveFeedbackBG});
		i { animation: ${PulseIcon} 0.3s linear 1; }
	}
`);

const NeutralFeedbackButton = styled.button(({ theme }) => css`
	background: ${theme.colors.grey};
	color: ${theme.colors.text_primary};
	border-radius: 0;
	border: 0;

	&.active { 
		background: #cbcbcb;
		i { animation: ${PulseIcon} 0.3s linear 1; }
	}
`);

const NegativeFeedbackButton = styled.button(({ theme }) => css`
	background: ${theme.colors.invalid};
	color: ${theme.colors.actual_white};
	border-radius: 0 20px 20px 0;
	border: 0;

	&.active { 
		background: url(${NegativeFeedbackBG});
		i { animation: ${PulseIcon} 0.3s linear 1; }
	}
`);

export const GiveFeedback = () => {
	const { feedBack, setFeedback } = useContext(FeedbackContext);
	return (
		<React.Fragment>
			<div className="d-flex justify-content-center">
				<div>
					<PositiveFeedbackButton
						className={`d-flex align-items-center justify-content-center ps-3 pe-2 py-2 ${feedBack === "Positive" && 'active'}`}
						onClick={() => setFeedback('Positive')}
					>
						<i className="material-icons">thumb_up</i>
					</PositiveFeedbackButton>
				</div>
				<div>
					<NeutralFeedbackButton
						className={`d-flex align-items-center justify-content-center px-3 py-2 ${feedBack === "Neutral" && 'active'}`}
						onClick={() => setFeedback('Neutral')}
					>
						<i className="material-icons">sentiment_neutral</i>
					</NeutralFeedbackButton>
				</div>
				<div>
					<NegativeFeedbackButton
						className={`d-flex align-items-center justify-content-center ps-2 pe-3 py-2 ${feedBack === "Negative" && 'active'}`}
						onClick={() => setFeedback('Negative')}
					>
						<i className="material-icons">thumb_down</i>
					</NegativeFeedbackButton>
				</div>
			</div>
			{feedBack && <Paragraph className="mt-2">Giving {feedBack} feedback.</Paragraph>}
		</React.Fragment>
	);
}

const LumosIconBase = styled.svg(({ theme }) => css`
	#lumos-logo-outlines {
		fill: ${theme.colors.primary_cta};
	}
`);

export const LumosIcon = ({ className }) => (
	<LumosIconBase
		width="28px"
		height="22px"
		viewBox="0 0 28 22"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		className={className}
	>
		<title>Lumos Exchange Icon</title>
		<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
			<g id="lumos-logo-outlines" transform="translate(0.000000, -3.000000)" fill="">
				<g id="Group" transform="translate(0.000000, 3.000000)">
					<path d="M20.4615385,0 L28,8.10526316 L14,22 L0,8.10526316 L7.53846154,0 L20.4615385,0 Z M16.3333333,0 L7,9.33333333 L11.6666667,9.33333333 L11.6666667,9.33333333 L11.6666667,14 L11.6666667,14 L11.8993536,13.767313 C11.9338258,13.7328409 11.9721282,13.6945385 12.0142608,13.6524059 L12.1521494,13.5145173 C12.3513218,13.3153449 12.611778,13.0548887 12.933518,12.7331487 L13.6085975,12.0580691 C13.7579768,11.9086899 13.9159741,11.7506925 14.0825895,11.5840772 L14.9874833,10.6791833 C15.4432817,10.223385 15.9460005,9.72066619 16.4956397,9.17102698 L17.2281728,8.4384939 C17.3967033,8.26996341 17.569064,8.09760268 17.745255,7.92141172 L18.2853186,7.38134811 C18.46917,7.19749667 18.6568517,7.00981499 18.8483636,6.81830307 L21,4.66666667 L16.3333333,4.66666667 L16.3333333,0 Z" id="Combined-Shape"></path>
				</g>
			</g>
		</g>
	</LumosIconBase>
);

export const HorizontalDivider = styled.hr(({ theme }) => css`
	:not([size]) {
		color: ${theme.colors.text_primary};
		height: 1px;
		opacity: 0.2;
	}
`);

export const VerticalDivider = styled.hr(({ theme }) => css`
	:not([size]) {
		color: ${theme.colors.text_primary};
		height: 100%;
		width: 1px;
		opacity: 0.2;
	}
`);

export const ChatWrapper = styled.div(({ theme }) => css`
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

			&.self {
				border-radius: 0px 20px 20px 20px;
				background: ${theme.colors.primary_cta};
				color: ${theme.colors.base_bg};
			}
			
			&.admin {
				background: none;
				border-radius: 20px;
				color: ${theme.colors.primary_cta};
			}
		}

		.messages-icon {
			font-size: 48px;
			color: ${theme.colors.text_primary};
		}
`);

export const PaymentInfoArea = ({ paymentInfo, paymentMethod, reference }) => (
	<Card className="p-3 mb-4 d-flex flex-column" color="grey">
		<Paragraph size="20px">Using the following details:</Paragraph>
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
				<Paragraph bold size="20px" className="me-2 mb-0">
					Ref:
				</Paragraph>
				<Paragraph className="text-uppercase mb-0" size="20px">
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

export const IconPrimaryCta = styled.i(({ theme }) => css`
	color: ${theme.colors.primary_cta};
`);

export const HighlightedText = styled.span(({ theme }) => css`
    color: ${theme.colors.primary_cta};
`);

export const Reference = styled(Paragraph)`
	text-transform: uppercase;
`;

export const TitledIcon = styled.i`
	cursor: help;
`;

export const MaxHeightBarrier = styled.div(
	({ theme }) => css`
		overflow: auto;
		padding: 0 15px;
	`
);

export const ActionButton = styled(InvisibleButton)(
	({ theme, color, textColor }) => css`
		background: ${theme.colors[color]};
		border-radius: 50px;
		padding: 10px 25px;
		color: ${theme.colors.base_bg};
		font-size: 20px;

		&.delete {
			background: ${theme.colors.invalid};
			color: ${theme.colors.actual_white};
		}

		&:hover {
			transform: scale(1.05);
		}

		&:disabled {
			background: ${theme.colors.disabledGrey};
			cursor: not-allowed;
			color: ${theme.colors.actual_white};

			&:hover {
				transform: initial;
			}
		}
	`
);

export const MissingIcon = styled.i(
	({ theme }) => css`
		font-size: 80px;
		color: ${theme.colors.primary_cta};
	`
);

export const TradeHistoryTab = styled.a(
	({ theme }) => css`
		background: ${theme.colors.btn};
		color: ${theme.colors.text_primary};
		padding: 10px 30px;
		border-radius: 5px 5px 0 0;
		border-bottom: 2px solid ${theme.colors.btn};
		margin-right: 16px;
		text-decoration: none;

		&:hover {
			color: ${theme.colors.primary_cta};
		}

		&.selected {
			background: ${theme.colors.primary_cta};
			color: ${theme.colors.base_bg};
			border-bottom: 2px solid ${theme.colors.primary_cta};
			font-family: "THICCCBOI-BOLD";
		}

		&.wide {
			min-width: 200px;
			text-align: center;
		}
	`
);

export const Tabs = styled.div`
	padding: 0 0 0 9px;
	overflow-x: auto;
`;

export const TradeHistoryTabs = ({ selected }) => (
	<Tabs className="d-flex align-items-end">
		<TradeHistoryTab href="/TradeHistory/Buy" className={selected === "Buy" && "selected"}>
			Buy
		</TradeHistoryTab>
		<TradeHistoryTab href="/TradeHistory/Sell" className={selected === "Sell" && "selected"}>
			Sell
		</TradeHistoryTab>
		<TradeHistoryTab href="/TradeHistory/Completed" className={selected === "Completed" && "selected"}>
			Completed
		</TradeHistoryTab>
	</Tabs>
);

export const ContentTab = styled.div(
	({ theme }) => css`
		background: ${theme.colors.panel_bg};
		border-radius: 3px;
		border: 2px solid ${theme.colors.primary_cta};
	`
);