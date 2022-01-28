import styled, { css, keyframes } from "styled-components";
import LoadingSpinner from '../Images/loading-spinner.png';

export const ContentTab = styled.div(
    ({ theme }) => css`
      background: ${theme.colors.grey};
      border-radius: 3px;
      border: 2px solid ${theme.colors.yellow};
  
      .bronze {
        color: ${theme.colors.bronze};
      }
      .silver {
        color: ${theme.colors.silver};
      }
      .gold {
        color: ${theme.colors.gold};
      }
  `);
  
  export const EditableOption = styled.div(
    ({ theme }) => css`
      background: ${theme.colors.white};
      border-radius: 3px;
    `
  );
  
  export const ProfileInitials = styled.div(
    ({ theme }) => css`
      width: 75px;
      height: 75px;
      border-radius: 50px;
      background: ${theme.colors.yellow};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.colors.black};
      font-size: 30px;
      font-family: "THICCCBOI-BOLD";
    `
  );
  
  export const ProfileTab = styled.button(
    ({ theme }) => css`
      background: ${theme.colors.white};
      padding: 10px 30px;
      border-radius: 5px 5px 0 0;
      border: 0;
      margin-right: 16px;
  
      &.active {
        background: ${theme.colors.yellow};
        font-family: "THICCCBOI-BOLD";
      }
    `
  );
  
  export const AccountTierCard = styled.div(
    ({ theme, tier }) => css`
      background: ${theme.colors[tier]};
      color: ${theme.colors.white};
      cursor: pointer;
  
      .inner {
        background-color: ${theme.colors.white};
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
      background: ${theme.colors.black};
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