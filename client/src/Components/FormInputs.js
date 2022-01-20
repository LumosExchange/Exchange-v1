
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const StyledInput = styled.input(({ theme, hasIcon }) => css`
	background: ${theme.colors.grey};
	border-radius: ${hasIcon ? '0 10px 10px 0' : '10px'};
	border: 2px solid transparent;
	color: ${theme.colors.white};
	font-size: 24px;
	padding: 10px;

	:focus, :active {
		border: 2px solid ${theme.colors.yellow};
		outline: none;
	}

	&:-webkit-autofill{
		-webkit-box-shadow: 0 0 0 1000px ${theme.colors.grey} inset;
		-webkit-text-fill-color: white;
		border-color: ${theme.colors.yellow};
	}
`);

const RoundedInput = styled.input(({ theme, hasIcon }) => css`
	background: ${theme.colors.navyGrey};
	border-radius: 50px;
	border: 2px solid transparent;
	color: ${theme.colors.white};
	font-size: 18px;
	padding: 10px;

	:focus, :active {
		border: 2px solid rgba(255,255,255,0.1);
		outline: none;
	}

	&:-webkit-autofill{
		-webkit-box-shadow: 0 0 0 1000px ${theme.colors.grey} inset;
		-webkit-text-fill-color: white;
		border-color: ${theme.colors.yellow};
	}
`);

const IconArea = styled.div(({ theme, hasIcon }) => css`
	background: ${theme.colors.grey};
	min-height: 60px;
	padding: 10px;
	border-radius: 10px 0 0 10px;
`);

export const FormInput = ({
    hasIcon, text, className, textColor,
    id, pattern, placeholder, color,
    type, form, value, icon, rounded,
    padding, onChange
}) => (
	<div className="d-flex">
		{hasIcon && (
			<IconArea className="d-flex align-items-center">
				<i className="material-icons text-white">{icon}</i>
			</IconArea>
		)}
		{rounded ? (
			<RoundedInput
				className={className}
				form={form}
				hasIcon={ hasIcon }
				id={id}
				pattern={pattern}
				placeholder={placeholder}
				text={text}
				type={type}
				value={value}
				color={color}
                textColor={textColor}
                padding={padding}
                onChange={onChange}
			/>
		) : (
			<StyledInput
				className={className}
				form={form}
				hasIcon={ hasIcon }
				id={id}
				pattern={pattern}
				placeholder={placeholder}
				text={text}
				type={type}
				value={value}
				color={color}
                textColor={textColor}
                padding={padding}
                onChange={onChange}
			/>
		)}
	</div>
);

const StyledCheckbox = styled.input(({ theme }) => css`
	-webkit-appearance: none;
	background-color: ${theme.colors.grey};
	border-radius: 5px;
	border: 0;
	height: 26px;
	min-width: 26px;
	width: 26px;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;

	&:checked {
		background-color: ${theme.colors.yellow};

		&::after {
			border-radius: 5px;
			content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjZweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjYgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGcgaWQ9IkFydGJvYXJkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iY2hlY2tfYmxhY2tfMjRkcCI+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBwb2ludHM9IjAgMCAyNiAwIDI2IDI2IDAgMjYiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSIxMC4wMzgwODk4IDE3LjgzNDQ1MTkgNS41MzM4MjYwNCAxMy4xNzAwMjI0IDQgMTQuNzQ3MjAzNiAxMC4wMzgwODk4IDIxIDIzIDcuNTc3MTgxMjEgMjEuNDc2OTc1NiA2Ij48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=");
			display: block;
			height: 100%;
			width: 100%;
		}
	}
`);

export const FormCheckbox = ({ className, id, name }) => (
	<StyledCheckbox
		type="checkbox"
		className={`me-4 ${className}`}
		id={id}
		name={name}
	/>
);

export const StyledLabel = styled.label(({ theme, color, padding, fontSize }) => css`
	color: ${theme.colors[color]};
	cursor: pointer;
	font-size: ${fontSize};
	padding: ${padding};

	a { color: ${theme.colors.yellow}; }
`);

StyledLabel.propTypes = {
	color: PropTypes.string,
	padding: PropTypes.string,
	fontSize: PropTypes.string,
}

StyledLabel.defaultProps = {
    color: 'white',
	padding: '0 0 0 10px',
	fontSize: '18px',
}

export const PageBody = styled.div(({ theme }) => css`
	background: ${theme.colors.black};
	font-family: 'THICCCBOI-REGULAR';
	min-height: calc(100vh - 80px);
`);

export const StyledDropdown = styled.select(({ theme }) => css`
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background: ${theme.colors.grey};
	background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMkwxMiAxMi45MDkxTDIyIDIiIHN0cm9rZT0iI0NFQ0VDRSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==);
	background-position: 95%;
	background-repeat: no-repeat;
	border-radius: 10px;
	border: 0;
	color: ${theme.colors.white};
	font-size: 20px;
	outline: 0;
	padding: 16px;
`);