import PropTypes from 'prop-types';
import styled, { css } from "styled-components";

const Paragraph = styled.p(({ theme, color, size, bold }) => css`
	font-family: ${bold ? 'THICCCBOI-BOLD' : 'THICCCBOI-REGULAR'};
	font-size: ${size};
	color: ${theme.colors[color]};
`);

Paragraph.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
	bold: PropTypes.bool,
}

Paragraph.defaultProps = {
    color: 'white',
	size: '16px',
	bold: false,
}

export default Paragraph;