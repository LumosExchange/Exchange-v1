import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import Heading from "./Heading";
import PropTypes from 'prop-types';

export const ContentTab = styled.div(({ theme }) => css`
	background: ${theme.colors.panel_bg};
	border-radius: 3px;
	border: 2px solid ${theme.colors.primary_cta};

	.bronze { color: ${theme.colors.bronze}; }
	.silver { color: ${theme.colors.silver}; }
	.gold { color: ${theme.colors.gold}; }
`);
  
export const EditableOption = styled.div(({ theme }) => css`
    border-radius: 3px;
`);
  
export const ProfileInitials = styled.div(({ theme }) => css`
	width: 75px;
	height: 75px;
	border-radius: 50px;
	background: ${theme.colors.primary_cta};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${theme.colors.base_bg};
	font-size: 30px;
	font-family: "THICCCBOI-BOLD";
    text-transform: uppercase;
`);
  
export const ProfileTab = styled.button(({ theme }) => css`
      background: ${theme.colors.btn};
      color: ${theme.colors.text_primary};
      padding: 10px 30px;
      border-radius: 5px 5px 0 0;
      border: 0;
      margin-right: 16px;
  
      &.active {
        background: ${theme.colors.primary_cta};
        color: ${theme.colors.base_bg};
        
        font-family: "THICCCBOI-BOLD";
      }
`);

export const ProfileTabLink = styled.a(({ theme }) => css`
        background: ${theme.colors.btn};
        color: ${theme.colors.text_primary};
        padding: 10px 30px;
        border-radius: 5px 5px 0 0;
        border-bottom: 2px solid ${theme.colors.btn};
        margin-right: 16px;
        text-decoration: none;

        &:hover {
            color: ${theme.colors.primary_cta};
        }

        &.selected {
            background: ${theme.colors.primary_cta};
            color: ${theme.colors.base_bg};
            border-bottom: 2px solid ${theme.colors.primary_cta};
            font-family: "THICCCBOI-BOLD";
        }

        &.wide {
            min-width: 200px;
            text-align: center;
        }
`);

export const Tabs = styled.div`
      padding: 0 0 0 9px;
      overflow-x: auto;
`;
  
export const AccountTierCard = styled.div(({ theme, tier }) => css`
      background: ${theme.colors[tier]};
      color: ${theme.colors.text_primary};
      cursor: pointer;
  
      .inner {
        background-color: ${theme.colors.text_primary};
      }
  
      &.padding {
          padding: 5px;
      }
  
      &.opaque {
          opacity: 0.3;
          &:hover {
              opacity: 1;
          }
      }
  `);
  
export const CheckIcon = styled.i(({ theme }) => css`
      font-size: 40px;
      color: ${theme.colors.lightGrey};
      &.selected {
          color: #48a852;
      }
`);
  
export const Rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const LoadingSpinner = () => (
    <svg width="66px" height="65px" viewBox="0 0 66 65" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="HiFi" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Group" transform="translate(1.000000, 1.000000)">
                <circle id="Oval" stroke="#FF0000" strokeWidth="5" cx="32" cy="32" r="29.5"></circle>
                <path d="M61.5,32 C61.5,15.7075999 48.2924001,2.5 32,2.5 C15.7075999,2.5 2.5,15.7075999 2.5,32" id="Oval-Copy" stroke="#FFEF00" strokeWidth="6"></path>
            </g>
        </g>
    </svg>
);

export const FixedBackground = styled.div(({ theme }) => css`
      background: ${theme.colors.base_bg};
      z-index: 2;
      top: 0;
      left: 0;
  
      svg {
          width: 64px;
          height: 64px;
          min-width: 64px;
          min-height: 64px;
          animation: ${Rotate} 1.5s linear infinite;

          g circle {
              stroke: ${theme.colors.primary_cta};
          }
          g path {
            stroke: ${theme.colors.base_bg};
          }
      }
`);
  
  
export const LoadingState = () => (
	<FixedBackground className="position-absolute d-flex align-items-center justify-content-center w-100 h-100">
		<LoadingSpinner alt="Loading" />
	</FixedBackground>
);

const TwoFACard = styled.span(({ theme, selected }) => css`
	background: ${theme.colors.card_bg};
	border-radius: 10px;
    border: 2px solid ${selected ? theme.colors.valid : '#c4c4c4'};

    .material-icons {
        font-size: 28px;
        color: ${selected ? theme.colors.valid : '#c4c4c4'};
    }
`);

const StyledRadio = styled.input(({ theme }) => css`
	display: none;
`);

export const StyledLinkTo = styled(Link)(({ theme }) => css`
    color: ${theme.colors.primary_cta};
    text-decoration: none;
    font-size: 18px;

    &:hover {
        color: ${theme.colors.primary_link_hover};
        text-decoration: underline;
    }
`);

export const TwoFAOption = ({ id, option, onClick, selected, linkTo }) => (
    <div className={selected && 'selected'} onClick={onClick} selected={selected}>
        <label htmlFor={id} className="w-100 text-center">
            <StyledRadio id={id} type="radio" name="2faSelection" />
            <TwoFACard className="d-flex p-3 justify-content-between" selected={selected}>
                <div className="d-flex align-items-center">
                    <i className="material-icons me-2">{selected ? 'check_circle' : 'radio_button_unchecked'}</i>
                    <Heading size="20px" className="mb-0">{option}</Heading>
                </div>
                {!selected && (
                    <StyledLinkTo to={linkTo} rel="noopener noreferrer">Set Up</StyledLinkTo>
                )}
            </TwoFACard>
        </label>
    </div>
);

TwoFAOption.propTypes = {
    linkTo: PropTypes.string,
    option: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
}

TwoFAOption.defaultProps = {
    linkTo: "/",
}

export const TopBanner = styled.span(({ theme }) => css`
    background: ${theme.colors.panel_accent};
    border-bottom: 1px solid ${theme.colors.grey};
`);

export const ProfileTabs = ({ selected }) => (
	<Tabs className="d-flex align-items-end">
		<ProfileTabLink href="/Profile/Basic" className={selected === "Basic" && "selected"}>
			Basic
		</ProfileTabLink>
		<ProfileTabLink href="/Profile/Security" className={selected === "Security" && "selected"}>
			Security
		</ProfileTabLink>
		<ProfileTabLink href="/Profile/PaymentMethods" className={`wide ${selected === "PaymentMethods" && "selected"}`}>Payment Methods</ProfileTabLink>
		<ProfileTabLink href="/Profile/AccountUpgrade" className={`wide ${selected === "AccountUpgrade" && "selected"}`}>Account Upgrade</ProfileTabLink>
		<ProfileTabLink href="/Profile/Wallets" className={selected === "Wallets" && "selected"}>Wallets</ProfileTabLink>
	</Tabs>
);