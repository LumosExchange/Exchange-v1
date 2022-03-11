import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import Paragraph from "../Components/Paragraph";
import PropTypes from 'prop-types';
import VerifyBG from '../Images/verifybg.svg';
import ErrorBG from '../Images/errorbg.svg';
import PositiveFeedbackBG from '../Images/PositiveFeedbackBG.svg';
import NegativeFeedbackBG from '../Images/NegativeFeedbackBG.svg';

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
		i { animation: ${PulseIcon} 0.5s linear 1; }
	}
`);

const NeutralFeedbackButton = styled.button(({ theme }) => css`
	background: ${theme.colors.grey};
	color: ${theme.colors.text_primary};
	border-radius: 0;
	border: 0;

	&.active { 
		background: #cbcbcb;
		i { animation: ${PulseIcon} 0.5s linear 1; }
	}
`);

const NegativeFeedbackButton = styled.button(({ theme }) => css`
	background: ${theme.colors.invalid};
	color: ${theme.colors.actual_white};
	border-radius: 0 20px 20px 0;
	border: 0;

	&.active { 
		background: url(${NegativeFeedbackBG});
		i { animation: ${PulseIcon} 0.5s linear 1; }
	}
`);

export const GiveFeedback = () => {
	const [feedBack, setFeedback] = useState("");
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