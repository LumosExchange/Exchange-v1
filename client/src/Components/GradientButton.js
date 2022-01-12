import React from "react";
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const ButtonBase = styled.div(({ theme }) => css`
	border-radius: 50px;
	background: rgba(46, 46, 46, 0.5);
	background: linear-gradient(90deg, rgba(252,230,8,1) 0%, rgba(255,117,134,1) 33%, rgba(179,114,206,1) 66%, rgba(111,134,255,1) 100%);
	
    // &:hover { transform: scale(1.05); }

	.innerButton {
		background: #202020;
		margin: 3px;
		border-radius: 50px;
		padding: 4px 25px;
		transition: padding 0.3s ease-in-out;
		color: ${theme.colors.white};
		border: 0;

		&:hover {
			padding: 6px 30px;
			transition: padding 0.3s ease-in-out;
		}
	}
    
	a, a:hover { color: #fff; }
`);

const GradientButton = ({ text, linkTo, className, as, onClick, value, type }) => (
	<ButtonBase className={`d-inline-flex ${className}`}>
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
			>{text}</button>
		)}
	</ButtonBase>
);

GradientButton.propTypes = {
	text: PropTypes.string,
	linkTo: PropTypes.string,
    as: PropTypes.string,
}

GradientButton.defaultProps = {
    text: 'Button Text',
	linkTo: '#',
	as: 'link',
}

export default GradientButton;