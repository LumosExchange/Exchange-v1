import React from "react";
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';
const ButtonBase = styled.div(
	({ theme, fontSize, borderSize }) => css`
		border-radius: 50px;
		padding: 3px;
		background: rgba(46, 46, 46, 0.5);
		background: linear-gradient(
			90deg,
			${theme.colors.gradients.yellow} 0%,
			${theme.colors.gradients.peach} 33%,
			${theme.colors.gradients.mauve} 66%,
			${theme.colors.gradients.blue} 100%
		);

		.innerButton {
			background: ${theme.colors.grad_button2};
			margin: ${borderSize};
			border-radius: 50px;
			font-size: ${fontSize};
			padding: 10px;
			color: ${theme.colors.actual_white};
			border: 0;

			&:disabled {
				opacity: 0.7;
			}
		}

		&:hover {
			transform: scale(1.1);
		}
	`
);

const SendButton = ({
	icon,
	className,
	onClick,
	value,
	type,
	fontSize,
	disabled,
}) => (
	<ButtonBase
		fontSize={fontSize}
		className={`d-inline-flex ${className ? className : ""}`}
	>
		<button
			className="innerButton d-flex align-items-center jusityf-content-center"
			onClick={onClick}
			value={value}
			type={type}
			fontSize={fontSize}
			disabled={disabled}
		>
			<i className="material-icons">{icon}</i>
		</button>
	</ButtonBase>
);

export default SendButton;