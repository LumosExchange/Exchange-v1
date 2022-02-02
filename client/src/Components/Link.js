import styled, { css } from "styled-components";

const Link = styled.a(({ theme }) => css`
	color: ${theme.colors.primary_link};
	text-decoration: none;
	font-size: 18px;
    font-family: "THICCCBOI-REGULAR";

	&:hover, &:focus, &:active {
		color: ${theme.colors.primary_link_hover};
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
		color: ${theme.colors.primary_link};
		text-decoration: underline;	
	}
`);