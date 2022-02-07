import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const GradientCard = styled.div(({
    theme, stopOne, stopOnePosition, stopTwo, stopTwoPosition,
    stopThree, stopThreePosition, stopFour, stopFourPosition,
    padding, stops, stopFive, stopFivePosition, gradientAngle
}) => css`
    border-radius: 20px;
    padding: ${padding};
    background: linear-gradient(${gradientAngle}deg,
        ${theme.colors.gradients.shared[stopOne]} ${stopOnePosition}%,
        ${theme.colors.gradients.shared[stopTwo]} ${stopTwoPosition}%

        ${stops >= 3 && `
            ,${theme.colors.gradients.shared[stopThree]} ${stopThreePosition}%,
        `}
        ${stops >= 4 && `
            ${theme.colors.gradients.shared[stopFour]} ${stopFourPosition}%
        `}
        ${stops >= 5 && `
            ${theme.colors.gradients.shared[stopFive]} ${stopFivePosition}%
        `}
    );

    img {
        width: 100%;
        max-width: 90px;

        &.inline {
            width: 28px;
            min-width: 28px;
            min-height: 28px;
        }
    }

    p, span, h2 {
        color: ${theme.colors.actual_white};
    }
`);

GradientCard.propTypes = {
    stops: PropTypes.number,
    stopOnePosition: PropTypes.number,
    stopTwoPosition: PropTypes.number,
    stopThreePosition: PropTypes.number,
    stopFourPosition: PropTypes.number,
    stopFivePosition: PropTypes.number,
    gradientAngle: PropTypes.number,
}

GradientCard.defaultProps = {
    stops: 2,
    stopOnePosition: 0,
    stopTwoPosition: 100,
    stopThreePosition: 125,
    stopFourPosition: 150,
    stopFivePosition: 175,
    gradientAngle: 90,
}



export default GradientCard;