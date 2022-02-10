import PropTypes from 'prop-types';
import { Children } from 'react';
import styled, { css } from "styled-components";

const ButtonBase = styled.button(({ 
    theme, round, size, textColor, boldText, fontSize
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

    span, i { color: ${theme.colors.base_bg}; };

    @media screen and (min-width: ${theme.breakpoints.md}) {
        width: auto;
    }
`);

const PrimaryButton = ({
    text, size, hasIcon, disabled,
    iconPosition, iconName, className,
    onClick, type, form, value, color,
    textColor, round, boldText, fontSize
}) => (
    <ButtonBase
        onClick={onClick} type={type} form={form} value={value}
        size={size} textColor={textColor} disabled={disabled}
        round={round} boldText={boldText} fontSize={fontSize}
        className={`d-flex align-items-center justify-content-center ${className ? className : ''}`}
    >
        {(hasIcon) && (iconPosition === 'left') && (
            <i className="material-icons me-3">{iconName}</i>
        )}
        <span textColor={textColor}>{text}</span>
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
    textColor: 'text_primary',
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
    textColor, round, boldText, fontSize
}) => (
    <SecondaryBase
        onClick={onClick} type={type} form={form} value={value}
        size={size} color={color} textColor={textColor} disabled={disabled}
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
    textColor: PropTypes.string,
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
    textColor: 'black',
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
    textColor, round, boldText, fontSize
}) => (
    <LinkButtonBase
        onClick={onClick} type={type} form={form} value={value}
        size={size} textColor={textColor} disabled={disabled}
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
    </LinkButtonBase>
);

LinkButton.propTypes = {
	size: PropTypes.string,
	round: PropTypes.bool,
    text: PropTypes.string,
    hasIcon: PropTypes.bool,
    color: PropTypes.string,
    textColor: PropTypes.string,
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
    textColor: 'black',
    boldText: true,
}

const InlineButtonBase = styled.button(({ theme }) => `
    background: ${theme.colors.primary_cta};
    border-radius: 3px;
    color: ${theme.colors.base_bg};
    padding: 10px 30px;
`);

export const InlineButton = ({ children, onClick }) => (
    <InlineButtonBase className="border-0 w-100" onClick={onClick}>
        {children}
    </InlineButtonBase>
);