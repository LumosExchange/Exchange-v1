import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
import { lighten, darken } from 'polished';

const ButtonBase = styled.button(({ 
    theme, round, size, textcolor, boldText, fontSize
}) => css`
	background: ${theme.colors.primary_cta};
	border-radius: ${round ? '50px' : '20px'};
	border: 0;
	font-size: ${fontSize ? fontSize : '20px'};
    width: 100%;
	font-family: ${boldText ? 'THICCCBOI-BOLD' : 'THICCCBOI-REGULAR'};
	padding: ${
		(size === 'sm' && '8px')
		|| (size === 'md' && '10px 30px')
		|| (size === 'lg' && '16px')
	};

    &:hover { transform: scale(1.05); }

    &:disabled {
        background: ${theme.colors.secondary_link};
        cursor: not-allowed;
        &:hover { transform: none; }
    }

    &.red {
        background: ${theme.colors.invalid};
    }

    &.clear {
        background: transparent;
        border: 2px solid ${theme.colors.primary_cta};
        span { color: ${theme.colors.primary_cta}; }
    }

    span, i { color: ${theme.colors.base_bg}; };

    @media screen and (min-width: ${theme.breakpoints.md}) {
        width: auto;
    }
`);

const PrimaryButton = ({
    text, size, hasIcon, disabled,
    iconPosition, iconName, className,
    onClick, type, form, value, color,
    textcolor, round, boldText, fontSize
}) => (
    <ButtonBase
        onClick={onClick} type={type} form={form} value={value}
        size={size} textcolor={textcolor} disabled={disabled}
        round={round} boldText={boldText} fontSize={fontSize}
        className={`d-flex align-items-center justify-content-center ${className ? className : ''}`}
    >
        {(hasIcon) && (iconPosition === 'left') && (
            <i className="material-icons me-3">{iconName}</i>
        )}
        <span textcolor={textcolor}>{text}</span>
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
    textcolor: PropTypes.string,
    boldText: PropTypes.bool,
}

PrimaryButton.defaultProps = {
	size: 'md',
	round: false,
    text: 'Button Text',
    hasIcon: false,
    iconPosition: 'right',
    iconName: 'arrow_forward',
    textcolor: 'text_primary',
    boldText: true,
}

export default PrimaryButton;

export const InvisibleButton = styled.button`
    background: none;
    border: 0;
`;

const SecondaryBase = styled.button(({ theme, bold, size }) => `
    background: ${theme.colors.secondary_cta};
	border-radius: 50px;
	border: 0;
	font-size: 20px;
    width: 100%;
	color: ${theme.colors.text_primary};
	font-family: ${bold ? 'THICCCBOI-BOLD' : 'THICCCBOI-REGULAR'};
    padding: ${
		(size === 'sm' && '8px')
		|| (size === 'md' && '10px 30px')
		|| (size === 'lg' && '16px')
	};
    &:hover { transform: scale(1.05); }
`);

export const SecondaryButton = ({
    text, size, hasIcon, disabled,
    iconPosition, iconName, className,
    onClick, type, form, value, color,
    textcolor, round, boldText, fontSize
}) => (
    <SecondaryBase
        onClick={onClick} type={type} form={form} value={value}
        size={size} color={color} textcolor={textcolor} disabled={disabled}
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
    </SecondaryBase>
);

SecondaryButton.propTypes = {
	size: PropTypes.string,
	round: PropTypes.bool,
    text: PropTypes.string,
    hasIcon: PropTypes.bool,
    color: PropTypes.string,
    textcolor: PropTypes.string,
    boldText: PropTypes.bool,
}

SecondaryButton.defaultProps = {
	size: 'md',
	round: false,
    text: 'Button Text',
    hasIcon: false,
    iconPosition: 'right',
    iconName: 'arrow_forward',
    color: 'yellow',
    textcolor: 'black',
    boldText: true,
}

const LinkButtonBase = styled.button(({ theme, bold, size, fontSize }) => `
    background: transparent;
	border-radius: 50px;
	border: 0;
	font-size: ${fontSize};
    width: 100%;
	color: ${theme.colors.primary_cta};
	font-family: ${bold ? 'THICCCBOI-BOLD' : 'THICCCBOI-REGULAR'};
    padding: ${
		(size === 'sm' && '8px')
		|| (size === 'md' && '10px 30px')
		|| (size === 'lg' && '16px')
	};

    &:hover {
        color: ${theme.colors.primary_cta_hover};
        transform: scale(1.05);
    }
`);

export const LinkButton = ({
    text, size, hasIcon, disabled,
    iconPosition, iconName, className,
    onClick, type, form, value,
    textcolor, round, boldText, fontSize
}) => (
    <LinkButtonBase
        onClick={onClick} type={type} form={form} value={value}
        size={size} textcolor={textcolor} disabled={disabled}
        round={round} boldText={boldText} fontSize={fontSize}
        className={`d-flex align-items-center ${className ? className : ''}`}
    >
        {(hasIcon) && (iconPosition === 'left') && (
            <i className="material-icons me-3">{iconName}</i>
        )}
        <span>{text}</span>
        {(hasIcon) && (iconPosition === 'right') && (
            <i className="material-icons ms-3">{iconName}</i>
        )}
    </LinkButtonBase>
);

LinkButton.propTypes = {
	size: PropTypes.string,
	round: PropTypes.bool,
    text: PropTypes.string,
    hasIcon: PropTypes.bool,
    color: PropTypes.string,
    textcolor: PropTypes.string,
    boldText: PropTypes.bool,
}

LinkButton.defaultProps = {
	size: 'md',
	round: false,
    text: 'Button Text',
    hasIcon: false,
    iconPosition: 'right',
    iconName: 'arrow_forward',
    color: 'yellow',
    textcolor: 'black',
    boldText: true,
}

const InlineButtonBase = styled.button(({ theme, color }) => `
    background: ${theme.colors[color]};
    border-radius: 3px;
    color: ${theme.colors.base_bg};
    padding: 10px 0;
    border: 2px solid ${theme.colors[color]};
    font-family: "THICCCBOI-REGULAR";
    font-size: 18px;

    &:hover, &:focus {
        background: ${darken(0.05, theme.colors[color])};
        border: 2px solid ${darken(0.05, theme.colors[color])};
    }

    &.delete {
        background: ${theme.colors.invalid};
        border: 2px solid ${theme.colors.invalid};
    }

    &.cancel {
        background: ${theme.colors.base_bg};
        border: 2px solid ${theme.colors.primary_cta};
        color: ${theme.colors.primary_cta};
    }
`);

export const InlineButton = ({ children, onClick, className, color, accentColor }) => (
    <InlineButtonBase
        className={`w-100 text-center ${className && className}`}
        onClick={onClick}
        color={color}
        accentColor={accentColor}
    >
        {children}
    </InlineButtonBase>
);

InlineButton.propTypes = {
	color: PropTypes.string,
}

InlineButton.defaultProps = {
    color: 'primary_cta',
}