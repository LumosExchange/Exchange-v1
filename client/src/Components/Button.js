import PropTypes from 'prop-types';
import styled, { css } from "styled-components";

const ButtonBase = styled.button(({ theme, round, size }) => css`
	background: ${theme.colors.yellow};
	border-radius: ${round ? '50px' : '20px'};
	border: 0;
	font-size: 20px;
    width: 100%;
	color: ${theme.colors.black};
	font-family: 'THICCCBOI-BOLD';
	padding: ${
		(size === 'sm' && '8px')
		|| (size === 'md' && '10px 30px')
		|| (size === 'lg' && '16px')
	};

    @media screen and (min-width: ${theme.breakpoints.md}) {
        width: auto;
    }
`);

const PrimaryButton = ({ text, size, hasIcon, iconPosition, iconName, className }) => (
    <ButtonBase size={size} className={`d-flex align-items-center justify-content-center ${className}`}>
        {(hasIcon) && (iconPosition === 'left') && (
            <i className="material-icons me-3">{iconName}</i>
        )}
        <span>{text}</span>
        {(hasIcon) && (iconPosition === 'right') && (
            <i className="material-icons ms-3">{iconName}</i>
        )}

    </ButtonBase>
);

PrimaryButton.propTypes = {
	size: PropTypes.string,
	round: PropTypes.bool,
    text: PropTypes.string,
    hasIcon: PropTypes.bool,
}

PrimaryButton.defaultProps = {
	size: 'md',
	round: false,
    text: 'Button Text',
    hasIcon: false,
    iconPosition: 'right',
    iconName: 'arrow_forward',
}

export default PrimaryButton;