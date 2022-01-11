import styled, { css } from "styled-components";

const Heading = styled.h2(({ theme, color, size }) => css`
	font-family: 'THICCCBOI-REGULAR';
	font-size: ${size};
	color: ${theme.colors[color]};
`);

export default Heading;