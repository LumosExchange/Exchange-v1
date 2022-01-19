import styled, { css } from "styled-components";
import PropTypes from 'prop-types';

const GradientCard = styled.div(({
	theme, stops, padding, 
    stopOne, stopOnePosition,
    stopTwo, stopTwoPosition,
	stopThree, stopThreePosition,
    stopFour, stopFourPosition,
    stopFive, stopFivePosition
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
		${stops >= 5 && `
			,${theme.colors.gradients[stopFive]} ${stopFivePosition}%
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

GradientCard.propTypes = {
	padding: PropTypes.string,
	stopOne: PropTypes.string,
	stopOnePosition: PropTypes.number,
	stopTwo: PropTypes.string,
	stopTwoPosition: PropTypes.number,
	stopThree: PropTypes.string,
	stopThreePosition: PropTypes.number,
	stopFour: PropTypes.string,
	stopFourPosition: PropTypes.number,
	stops: PropTypes.number,
}

GradientCard.defaultProps = {
	padding: '10px 30px',
	stopOne: 'sage',
	stopOnePosition: 0,
	stopTwo: 'yellow',
	stopTwoPosition: 25,
	stopThree: 'pink',
	stopThreePosition: 50,
	stopFour: 'blue',
	stopFourPosition: 75,
	stopFive: 'blue',
	stopFivePosition: 100,
	stops: 2,
}

export default GradientCard;