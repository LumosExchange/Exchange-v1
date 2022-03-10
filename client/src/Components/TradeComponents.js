import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Paragraph from "../Components/Paragraph";

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

export const Stepper = () => (
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
				<Paragraph className="text-center mt-3 p-2">Put SOL in Escrow</Paragraph>
			</div>
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">Received Buyer’s Payment</Paragraph>
			</div>
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">Escrow Released to buyer</Paragraph>
			</div>
		</div>
	</div>
);

export const HalfStepper = () => (
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
				<Paragraph className="text-center mt-3 p-2">Put SOL in Escrow</Paragraph>
			</div>
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">Received Buyer’s Payment</Paragraph>
			</div>
			<div className="col-4 d-flex justify-content-center">
				<Paragraph className="text-center mt-3 p-2">Escrow Released to buyer</Paragraph>
			</div>
		</div>
	</div>
);