import PropTypes from 'prop-types';
import styled, { css } from "styled-components";

const ButtonBase = styled.button(({ 
    theme, round, size, color, textColor, boldText, fontSize
}) => css`
	background: ${theme.colors[color]};
	border-radius: ${round ? '50px' : '20px'};
	border: 0;
	font-size: ${fontSize ? fontSize : '20px'};
    width: 100%;
	color: ${theme.colors[textColor]};
	font-family: ${boldText ? 'THICCCBOI-BOLD' : 'THICCCBOI-REGULAR'};
	padding: ${
		(size === 'sm' && '4px 25px')
		|| (size === 'md' && '10px 30px')
		|| (size === 'lg' && '16px')
	};
    height: auto;

    &:hover { transform: scale(1.05); }

    @media screen and (min-width: ${theme.breakpoints.md}) {
        width: auto;
    }
`);

const PrimaryButton = ({
    text, size, hasIcon, 
    iconPosition, iconName, className,
    onClick, type, form, value, color,
    textColor, round, boldText, fontSize
}) => (
    <ButtonBase
        onClick={onClick} type={type} form={form} value={value}
        size={size} color={color} textColor={textColor} 
        round={round} boldText={boldText} fontSize={fontSize}
        className={`d-flex align-items-center justify-content-center ${className ? className : ''}`}
    >
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
    color: PropTypes.string,
    textColor: PropTypes.string,
    boldText: PropTypes.bool,
}

PrimaryButton.defaultProps = {
	size: 'md',
	round: false,
    text: 'Button Text',
    hasIcon: false,
    iconPosition: 'right',
    iconName: 'arrow_forward',
    color: 'yellow',
    textColor: 'black',
    boldText: true,
}

export default PrimaryButton;