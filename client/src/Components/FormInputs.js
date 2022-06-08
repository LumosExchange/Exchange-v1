import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledInput = styled.input(({ theme, hasIcon, color }) => css`
	background: ${theme.colors[color]};
	border-radius: ${hasIcon ? "0 10px 10px 0" : "10px"};
	border: 2px solid transparent;
	color: ${theme.colors.text_primary};
	font-size: 24px;
	padding: 10px;
	width: 100%;

	&.invalid {
		border: 2px solid ${theme.colors.invalid};
	}

	:focus,
	:active {
		border: 2px solid ${theme.colors.primary_cta};
		outline: none;
		&.invalid {
			border: 2px solid ${theme.colors.invalid};
		}
	}

	:disabled {
		opacity: 0.5;
		border: 2px solid ${theme.colors.primary_cta};
		cursor: not-allowed;
	}

	&:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px ${theme.colors.grey} inset;
		-webkit-text-fill-color: ${theme.colors.text_primary};
		border-color: ${theme.colors.primary_cta};
	}

	/* Chrome, Safari, Edge, Opera */
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	&[type="number"] {
		-moz-appearance: textfield;
	}
`);

const RoundedInput = styled.input(({ theme, color }) => css`
	background: ${theme.colors[color]};
	border-radius: 50px;
	border: 2px solid transparent;
	color: ${theme.colors.text_primary};
	font-size: 18px;
	padding: 10px;

	:focus,
	:active {
		border: 2px solid rgba(255, 255, 255, 0.1);
		outline: none;
	}

	&:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px ${theme.colors.grey} inset;
		-webkit-text-fill-color: ${theme.colors.text_primary};
		border-color: ${theme.colors.primary_cta};
	}
`);

const IconArea = styled.div(({ theme }) => css`
	background: ${theme.colors.grey};
	min-height: 60px;
	padding: 10px;
	border-radius: 10px 0 0 10px;

	i {
		color: ${theme.colors.text_primary};
	}

	.customIcon {
		width: 24px;
		min-width: 24px;
		min-height: 24px;
	}
`);

export const FormInput = ({
	hasIcon,
	text,
	className,
	textColor,
	id,
	pattern,
	placeholder,
	color,
	type,
	form,
	value,
	icon,
	rounded,
	padding,
	onChange,
	onFocus,
	onBlur,
	onKeyUp,
	disabled,
	maxLength,
	onInput,
	customIcon,
	autocomplete,
	autoComplete,
}) => (
	<div className={`d-flex ${hasIcon && className ? className : ''}`}>
		{hasIcon && (
			<IconArea className="d-flex align-items-center">
				{!customIcon && <i className="material-icons">{icon}</i>}
				{customIcon && <img src={customIcon} alt="icon" className="customIcon" />}
			</IconArea>
		)}
		{rounded ? (
			<RoundedInput
				className={!hasIcon && className ? className : ''}
				form={form}
				hasIcon={hasIcon}
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
				onFocus={onFocus}
				onBlur={onBlur}
				disabled={disabled}
				maxLength={maxLength}
				onInput={onInput}
				onKeyUp={onKeyUp}
				autocomplete={autocomplete}
				autoComplete={autoComplete}
			/>
		) : (
			<StyledInput
				className={!hasIcon && className ? className : ''}
				form={form}
				hasIcon={hasIcon}
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
				onFocus={onFocus}
				onBlur={onBlur}
				disabled={disabled}
				maxLength={maxLength}
				onInput={onInput}
				onKeyUp={onKeyUp}
				autocomplete={autocomplete}
				autoComplete={autoComplete}
			/>
		)}
	</div>
);

FormInput.propTypes = {
	color: PropTypes.string,
	textColor: PropTypes.string,
	rounded: PropTypes.bool,
	hasIcon: PropTypes.bool,
};

FormInput.defaultProps = {
	color: "grey",
	textColor: "text-primary",
	rounded: false,
	hasIcon: false,
	className: "",
};

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
	cursor: pointer;

	&:checked {
		background-color: ${theme.colors.primary_cta};

		&::after {
			border-radius: 5px;
			content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjZweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjYgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGcgaWQ9IkFydGJvYXJkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iY2hlY2tfYmxhY2tfMjRkcCI+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBwb2ludHM9IjAgMCAyNiAwIDI2IDI2IDAgMjYiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSIxMC4wMzgwODk4IDE3LjgzNDQ1MTkgNS41MzM4MjYwNCAxMy4xNzAwMjI0IDQgMTQuNzQ3MjAzNiAxMC4wMzgwODk4IDIxIDIzIDcuNTc3MTgxMjEgMjEuNDc2OTc1NiA2Ij48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=");
			display: block;
			height: 100%;
			width: 100%;
		}
	}
`);

export const FormCheckbox = ({ className, id, name, onChange }) => (
	<StyledCheckbox type="checkbox" className={`me-4 ${className}`} id={id} name={name} onChange={onChange} />
);

export const StyledLabel = styled.label(({ theme, color, padding, fontSize, bold }) => css`
	color: ${theme.colors[color]};
	cursor: pointer;
	font-size: ${fontSize};
	padding: ${padding};
	font-family: ${bold ? "THICCCBOI-BOLD" : "THICCCBOI-REGULAR"};

	a {
		color: ${theme.colors.primary_cta};
	}
`);

StyledLabel.propTypes = {
	color: PropTypes.string,
	padding: PropTypes.string,
	fontSize: PropTypes.string,
};

StyledLabel.defaultProps = {
	color: "text_primary",
	padding: "0 0 0 10px",
	fontSize: "18px",
};

export const PageBody = styled.div(({ theme }) => css`
	background: ${theme.colors.base_bg};
	font-family: "THICCCBOI-REGULAR";
	min-height: calc(100vh - 80px);
`);

export const StyledDropdown = styled.select(
	({ theme, color }) => css`
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		background: ${theme.colors[color]};
		background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMkwxMiAxMi45MDkxTDIyIDIiIHN0cm9rZT0iI0NFQ0VDRSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==);
		background-position: 95%;
		background-repeat: no-repeat;
		border-radius: 10px;
		border: 2px solid ${theme.colors.grey};
		color: ${theme.colors.text_primary};
		font-size: 20px;
		outline: 0;
		padding: 13px;

		:focus,
		:active {
			border: 2px solid ${theme.colors.primary_cta};
			outline: none;
		}
	`
);

StyledDropdown.propTypes = {
	color: PropTypes.string,
};

StyledDropdown.defaultProps = {
	color: "grey",
};

export const InvisibleDropdown = styled.select(({ theme, color }) => css`
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background: transparent;
	border-radius: 10px;
	border: 0;
	color: ${theme.colors.text_primary};
	font-size: 20px;
	outline: 0;
	padding: 0 13px;

	:focus,
	:active {
		border: 0px;
		outline: none;
	}
`);

export const InlineInput = styled.input(({ theme, hasIcon, color }) => css`
	background: ${theme.colors.base_bg};
	border-radius: ${hasIcon ? "0 10px 10px 0" : "10px"};
	border: 2px solid ${theme.colors.primary_cta};
	color: ${theme.colors.text_primary};
	font-size: 24px;
	padding: 10px;
	max-height: 50px;

	:focus,
	:active {
		border: 2px solid ${theme.colors.primary_cta};
		outline: none;
	}

	:disabled {
		opacity: 0.5;
		border: 2px solid ${theme.colors.primary_cta};
		cursor: not-allowed;
	}

	&:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px ${theme.colors.grey} inset;
		-webkit-text-fill-color: ${theme.colors.text_primary};
		border-color: ${theme.colors.primary_cta};
	}
`);

InlineInput.propTypes = {
	textColor: PropTypes.string,
	rounded: PropTypes.bool,
};

InlineInput.defaultProps = {
	textColor: "text-primary",
	rounded: false,
};

const CustomFileInput = styled.input(({ theme }) => css`
	border: 1px solid red;
	display: none;

	+ label {
		border: 1px solid red;
		background: ${theme.colors.primary_cta};
		height: 50px;
		color: ${theme.colors.text_primary};
	}
`);

export const FileInput = ({ id, children }) => (
	<React.Fragment>
		<CustomFileInput id={id} type="file" />
		<label htmlFor={id} className="w-100">
			{children}
		</label>
	</React.Fragment>
);

export const TextArea = styled.textarea(({ theme, color }) => css`
	background: ${theme.colors[color]};
	border-radius: 10px;
	border: 2px solid transparent;
	color: ${theme.colors.text_primary};
	font-size: 24px;
	padding: 10px;
	width: 100%;

	:focus,
	:active {
		border: 2px solid ${theme.colors.primary_cta};
		outline: none;
	}

	:disabled {
		opacity: 0.5;
		border: 2px solid ${theme.colors.primary_cta};
		cursor: not-allowed;
	}
`);

TextArea.propTypes = {
	color: PropTypes.string,
};

TextArea.defaultProps = {
	color: "grey",
};
