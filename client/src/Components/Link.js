import styled, { css } from "styled-components";

const Link = styled.a(({ theme }) => css`
	color: ${theme.colors.yellow};
	text-decoration: none;
	&:hover, &:focus, &:active {
		color: ${theme.colors.white};
		text-decoration: underline;	
	}
`);

export default Link;