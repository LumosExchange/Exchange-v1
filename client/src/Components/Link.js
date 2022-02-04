import styled, { css } from "styled-components";

const Link = styled.a(({ theme }) => css`
	color: ${theme.colors.primary_cta};
	text-decoration: none;
	font-size: 18px;
    font-family: "THICCCBOI-REGULAR";

	&:hover, &:focus, &:active {
		color: ${theme.colors.primary_cta_hover};
		text-decoration: underline;	
	}
`);

export default Link;

export const FooterLink = styled.a(({ theme }) => css`
	color: ${theme.colors.secondary_link};
	text-decoration: none;
	font-size: 18px;
    font-family: "THICCCBOI-REGULAR";
	
	&:hover, &:focus, &:active {
		color: ${theme.colors.primary_cta};
		text-decoration: underline;	
	}
`);