import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div(({ theme, color, radius }) => css`
    background: ${theme.colors[color]};
    color: ${theme.colors.white};
    border-radius: ${radius};
`);

Card.propTypes = {
    color: PropTypes.string,
    radius: PropTypes.string,
}

Card.defaultProps = {
    color: 'grey',
    radius: '20px',
}

export default Card;