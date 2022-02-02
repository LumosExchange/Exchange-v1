import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const Heading = styled.h2(({ theme, color, size, bold }) => css`
	font-family: ${bold ? 'THICCCBOI-BOLD' : 'THICCCBOI-REGULAR'};
	font-size: ${size};
	color: ${theme.colors[color]};
`);

Heading.propTypes = {
	color: PropTypes.string,
	size: PropTypes.string,
	bold: PropTypes.bool,
}

Heading.defaultProps = {
	size: '36px',
	color: 'text_primary',
	bold: false,
}

export default Heading;