import styled, { css, keyframes } from "styled-components";
import LoadingSpinner from '../Images/loading-spinner.png';
import { LinkButton } from "./Buttons";
import Heading from "./Heading";

export const ContentTab = styled.div(({ theme }) => css`
	background: ${theme.colors.grey};
	border-radius: 3px;
	border: 2px solid ${theme.colors.primary_cta};

	.bronze { color: ${theme.colors.bronze}; }
	.silver { color: ${theme.colors.silver}; }
	.gold { color: ${theme.colors.gold}; }
`);
  
export const EditableOption = styled.div(({ theme }) => css`
    background: ${theme.colors.text_primary};
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
  
export const FixedBackground = styled.div(({ theme }) => css`
      background: ${theme.colors.base_bg};
      z-index: 2;
      margin-left: -12px;
  
      img {
          width: 64px;
          height: 64px;
          min-width: 64px;
          min-height: 64px;
          animation: ${Rotate} 1s linear infinite;
      }
`);
  
  
export const LoadingState = () => (
	<FixedBackground className="position-absolute d-flex align-items-center justify-content-center w-100 h-100">
		<img src={LoadingSpinner} alt="Loading" />
	</FixedBackground>
);

const TwoFACard = styled.span(({ theme, selected }) => css`
	background: ${theme.colors.card_bg};
	border-radius: 10px;
	cursor: pointer;
    border: 2px solid ${selected ? theme.colors.valid : '#c4c4c4'};

    .material-icons {
        font-size: 28px;
        color: ${selected ? theme.colors.valid : '#c4c4c4'};
    }
`);

const StyledRadio = styled.input(({ theme }) => css`
	display: none;
`);

export const TwoFAOption = ({ id, option, onClick, selected }) => (
	<div className={selected && 'selected'} onClick={onClick} selected={selected}>
		<label htmlFor={id} className="w-100 text-center">
			<StyledRadio id={id} type="radio" name="2faSelection" />
			<div>
				<TwoFACard className="d-flex p-3 justify-content-between" selected={selected}>
					<div className="d-flex align-items-center">
                        <i className="material-icons me-2">{selected ? 'check_circle' : 'radio_button_unchecked'}</i>
                        <Heading size="20px" className="mb-0">{option}</Heading>
                    </div>
                    {!selected && (
                        <LinkButton text="Set up" className="w-auto p-0" />
                    )}
				</TwoFACard>
			</div>
		</label>
	</div>
);