import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.div(({ theme, color }) => css`
	background: ${theme.colors[color]};
	border-radius: 10px;
    color: ${theme.colors.white};
`);

Card.propTypes = {
	color: PropTypes.string,
}

Card.defaultProps = {
	color: 'darkerGrey',
}

export default Card;