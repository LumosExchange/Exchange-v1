import styled, { css } from 'styled-components';

const GradientCard = styled.div(({
    theme, stopOne, stopOnePosition, stopTwo, stopTwoPosition,
    stopThree, stopThreePosition, stopFour, stopFourPosition,
    padding, stops
}) => css`
    border-radius: 20px;
    padding: ${padding};
    background: linear-gradient(90deg,
        ${theme.colors.gradients[stopOne]} ${stopOnePosition}%,
        ${theme.colors.gradients[stopTwo]} ${stopTwoPosition}%

        ${stops >= 3 && `
            ,${theme.colors.gradients[stopThree]} ${stopThreePosition}%,
        `}
        ${stops >= 4 && `
            ${theme.colors.gradients[stopFour]} ${stopFourPosition}%
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
`);

export default GradientCard;