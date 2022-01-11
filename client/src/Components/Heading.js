import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const Heading = styled.h2(({ theme, color, size }) => css`
	font-family: 'THICCCBOI-REGULAR';
	font-size: ${size};
	color: ${theme.colors[color]};
`);

Heading.propTypes = {
	color: PropTypes.string,
	size: PropTypes.string,
}

Heading.defaultProps = {
	size: '36px',
	color: 'white',
}

export default Heading;