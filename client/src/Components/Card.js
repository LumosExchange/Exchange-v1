import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div(({ theme, color }) => css`
    background: ${theme.colors[color]};
    color: ${theme.colors.white};
    border-radius: 20px;
`);

Card.propTypes = {
    color: PropTypes.string,
}

Card.defaultProps = {
    color: 'grey',
}

export default Card;