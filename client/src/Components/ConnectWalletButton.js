import styled, { css } from "styled-components";

const ConnectWalletButton = styled.button(
    ({ icon }) => css `
    background: url(${icon});
    border-radius: 50px;
    border: 0;
    min-height: 50px;
    width: 50px;
  `
);

export default ConnectWalletButton;