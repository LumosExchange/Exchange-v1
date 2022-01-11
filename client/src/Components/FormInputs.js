
import React from "react";
import styled, { css } from "styled-components";

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
`);

const IconArea = styled.div(({ theme, hasIcon }) => css`
	background: ${theme.colors.grey};
	min-height: 60px;
	padding: 10px;
	border-radius: 10px 0 0 10px;
`);

export const FormInput = ({
	hasIcon, text, className,
	id, pattern, placeholder,
	type, form, value, icon
}) => (
	<div className="d-flex">
		{hasIcon && (
			<IconArea className="d-flex align-items-center">
				<i className="material-icons text-white">{icon}</i>
			</IconArea>
		)}
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
		/>
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

export const StyledLabel = styled.label(({ theme, color }) => css`
	color: ${theme.colors[color]};
	cursor: pointer;
	font-size: 18px;
	padding-left: 10px;

	a { color: ${theme.colors.yellow}; }
`);

export const FormBody = styled.div(({ theme }) => css`
	background: ${theme.colors.black};
	font-family: 'THICCCBOI-REGULAR';
	min-height: calc(100vh - 80px);
`);