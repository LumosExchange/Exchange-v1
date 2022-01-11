import PropTypes from 'prop-types';
import styled, { css } from "styled-components";

const Paragraph = styled.p(({ theme, color, size }) => css`
	font-family: 'THICCCBOI-REGULAR';
	font-size: ${size};
	color: ${theme.colors[color]};
`);

Paragraph.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
}

Paragraph.defaultProps = {
    color: 'white',
	size: '16px',
}

export default Paragraph;