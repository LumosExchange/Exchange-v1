import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.div(({ theme, color, radius }) => css`
	background: ${theme.colors[color]};
	border-radius: ${radius};
    color: ${theme.colors.white};
`);

Card.propTypes = {
	color: PropTypes.string,
	radius: PropTypes.string,
}

Card.defaultProps = {
	color: 'darkerGrey',
	radius: '10px',
}

export default Card;