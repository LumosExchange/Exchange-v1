import React from "react";
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const ButtonBase = styled.button(({ theme, fontSize, padding, borderSize, dark }) => css`
	border-radius: 50px;
	background: rgba(46, 46, 46, 0.5);
	background: linear-gradient(90deg,
				${theme.colors.gradients.yellow} 0%,
				${theme.colors.gradients.peach} 33%,
				${theme.colors.gradients.mauve} 66%,
				${theme.colors.gradients.blue} 100%
			);
	border: 0;
	padding: 0;

	.innerButton {
		background: ${theme.colors.grad_button};
		margin: ${borderSize};
		border-radius: 50px;
		font-size: ${fontSize};
		padding: ${padding};
		color: ${theme.colors.actual_white};
		border: 0;

		:disabled {
			opacity: 0.7;
			cursor: not-allowed;
		}
	}

	&:hover { 
		transform: scale(1.05);
	}
`);

const GradientButton = ({
	text, linkTo, className,
	as, onClick, value, type,
	fontSize, padding, borderSize, dark, disabled
}) => (
	<ButtonBase
		fontSize={fontSize}
		className={`d-inline-flex ${className ? className : ''}`}
		padding={padding}
		borderSize={borderSize}
		dark={dark}
	>
		{as === 'link' ? (
			<a href={linkTo} alt="1" className="innerButton w-100 text-center text-decoration-none">
				{text}
			</a>
		) : (
			<button
				className="innerButton w-100 text-center text-decoration-none"
				onClick={onClick}
				value={value}
				type={type}
				fontSize={fontSize}
				disabled={disabled}
			>{text}</button>
		)}
	</ButtonBase>
);

GradientButton.propTypes = {
	text: PropTypes.string,
	linkTo: PropTypes.string,
    as: PropTypes.string,
	fontSize: PropTypes.string,
	padding: PropTypes.string,
	borderSize: PropTypes.string,
	dark: PropTypes.bool,
}

GradientButton.defaultProps = {
    text: 'Button Text',
	linkTo: '#',
	as: 'button',
	fontSize: '16px',
	padding: '7px 25px',
	borderSize: '3px',
	dark: false,
}

export default GradientButton;