import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { PageBody, FormInput, StyledDropdown } from "../Components/FormInputs";
import Heading from "../Components/Heading";
import Paragraph from "../Components/Paragraph";
import PrimaryButton, { InvisibleButton } from "../Components/Buttons";
import PhantomIcon from "../Images/phantom-icon-purple.svg";
import SolflareIcon from "../Images/solflare-icon.svg";
import Link from "../Components/Link";
import GradientButton from "../Components/GradientButton";
import * as web3 from "@solana/web3.js";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import SlopeIcon from "../Images/slope-finance-icon.png";
import Card from "../Components/Card";
import StyledTable from "../Components/Tables";
import { useWeb3Context } from "../Utils/web3-context";

const ToggleIconBase = styled.svg(
  ({ toggled, theme }) => css`
    transform: ${toggled && "rotate(180deg)"};
    &.small {
      width: 40px;
      min-height: 40px;
      min-width: 40px;
    }
    circle,
    path {
      stroke: ${theme.colors.text_primary};
    }
  `
);

const WalletCard = styled.span(
  ({ theme }) => css`
    background: ${theme.colors.card_bg};
    border-radius: 10px;
    cursor: pointer;
  `
);

const StyledRadio = styled.input(
  ({ theme }) => css`
    display: none;
    &:checked + div {
      background: -webkit-linear-gradient(
        300deg,
        #fce608,
        #ff7586,
        #b372ce,
        #6f86ff
      );
      border-radius: 10px;
      padding: 2px 4px 4px 2px;
    }
  `
);

const ConnectToggle = ({ id, image, wallet, className, onClick }) => (
  <div className={className} onClick={onClick}>
    <label htmlFor={id} className="w-100 text-center">
      <StyledRadio id={id} type="radio" name="walletSelection" />
      <div>
        <WalletCard className="d-flex p-4 flex-column">
          <img
            src={image}
            alt={wallet}
            className="pb-3 m-auto"
            style={{ width: "70px" }}
          />
          <Heading size="24px">{wallet}</Heading>
        </WalletCard>
      </div>
    </label>
  </div>
);

export const ToggleIcon = ({ className, toggled }) => (
  <ToggleIconBase
    width="71"
    height="71"
    viewBox="0 0 71 71"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    toggled={toggled}
  >
    <circle cx="35.5" cy="35.5" r="34" strokeWidth="3" />
    <path
      d="M25.5 33L36.5 44L47.5 33"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </ToggleIconBase>
);

const Divider = styled.hr(
  ({ theme }) => css`
	background ${theme.colors.secondary_link};
	width: 100%;
	opacity: 1;
`
);

const IconContainer = styled.div(
  ({ theme }) => css`
    img,
    svg {
      width: 100%;
      height: 117px;
    }
  `
);

const FakeTableData = [
  {
    token: "Solana",
    ticker: "SOL",
    amount: "225.4",
    value: "£10000",
  },
  {
    token: "Wrapped BTC",
    ticker: "WBTC",
    amount: "0.5",
    value: "£30000",
  },
];

//TODO:
// - On page load connect to user web3 wallet
// - Then get pub key of wallet
// - then get solana balnace / other token balance and map to table
// - then get all NFT's in the users wallet and display below

function MyWallet() {
  const { walletConnect, publickey, provider } = useWeb3Context();

  const [selectedWallet, selectWallet] = useState("");
  const [currentStep, setCurrentStep] = useState("connectWallet");

  const dispatch = useDispatch();
  // const provider = window.solana;

  async function getTokenBalance() {
    try {
      //Wait for web 3 connection
      const connection = new web3.Connection(
        web3.clusterApiUrl("devnet"),
        "confirmed"
      );

      //const balance = await connection.getAccountInfoAndContext(provider.publicKey).then(function(value) { console.log(value)});

      const tokenAccounts = await connection.getTokenAccountsByOwner(
        new web3.PublicKey(publickey),
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      //airdrop sol to wallet in cas eits blank
      var airdropSignature = await connection.requestAirdrop(
        provider.publicKey,
        web3.LAMPORTS_PER_SOL
      );

      tokenAccounts.value.forEach((e) => {
        const accountInfo = AccountLayout.decode(e.account.data);
        console.log(
          `${new web3.PublicKey(accountInfo.mint)}   ${accountInfo.amount}`
        );
      });

      // Confirming that the airdrop went through
      await connection.confirmTransaction(airdropSignature);
      console.log("Airdropped");
    } catch {
    } finally {
    }
  }

  useEffect(() => {
    if ("solana" in window && provider && publickey) {
      if (provider.isPhantom) {
        console.log("Is Phantom installed? ", provider.isPhantom);
        setCurrentStep("walletOverview");
      } else if (provider.isSolflare) {
        console.log("Is Solflare installed? ", provider.isSolflare);
        setCurrentStep("walletOverview");
      } else if (provider.isSlope) {
        console.log("Is Slope installed? ", provider.isSlope);
        setCurrentStep("walletOverview");
      }
    }
  }, [provider, publickey]);

  return (
    <PageBody className="d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-center py-5 flex-column">
        <Heading className="pb-4 text-center">
          Connect using a web3 Wallet
        </Heading>
        <Heading size="24px" className="text-center">
          Please select your wallet
        </Heading>
        <div className="row p-5 d-flex justify-content-center w-100">
          <div className="col-12 col-sm-5 col-lg-4 col-xl-4 col-xxl-2">
            <ConnectToggle
              wallet="Phantom"
              image={PhantomIcon}
              onClick={() => selectWallet("phantom")}
            />
          </div>
          <div className="col-12 col-sm-5 col-lg-4 col-xl-4 col-xxl-2 my-3 my-sm-0">
            <ConnectToggle
              wallet="Solflare"
              image={SolflareIcon}
              onClick={() => selectWallet("solflare")}
            />
          </div>
          <div className="col-12 col-sm-5 col-lg-4 col-xl-4 col-xxl-2 mt-sm-3 mt-lg-0">
            <ConnectToggle
              wallet="Slope"
              image={SlopeIcon}
              onClick={() => selectWallet("Slope")}
            />
          </div>
          <div className="col-12 col-lg-6 col-xl-8 d-flex mt-5">
            {selectedWallet === "phantom" && (
              <Paragraph size="18px">
                <Link href="https://phantom.app" alt="Phantom" target="_blank">
                  Phantom
                </Link>{" "}
                is a friendly, non-custodial browser extension, solana wallet
                that makes it safe & easy for you to store, send, receive,
                collect, and swap tokens.
                <PrimaryButton
                  text="Connect"
                  className="m-auto mt-3"
                  onClick={walletConnect}
                  type="check"
                  value="check"
                  hasIcon
                />
              </Paragraph>
            )}
            {selectedWallet === "solflare" && (
              <Paragraph size="18px">
                <Link
                  href="https://solflare.com"
                  alt="Solflare"
                  target="_blank"
                >
                  Solflare
                </Link>{" "}
                is a friendly non-custodial, browser extension, Solana wallet
                that makes it safe & easy for you to store, send, receive,
                collect, and swap tokens.
                <PrimaryButton
                  text="Connect"
                  className="m-auto mt-3"
                  onClick={walletConnect}
                  type="check"
                  value="check"
                  hasIcon
                />
              </Paragraph>
            )}
            {selectedWallet === "Slope" && (
              <Paragraph size="18px">
                <Link href="https://www.slope.com/" alt="Slope" target="_blank">
                  Slope
                </Link>{" "}
                is a friendly non-custodial, browser extension, Solana wallet
                that makes it safe & easy for you to store, send, receive,
                collect, and swap tokens.
                <PrimaryButton
                  text="Connect"
                  className="m-auto mt-3"
                  onClick={walletConnect}
                  type="check"
                  value="check"
                  hasIcon
                />
              </Paragraph>
            )}
          </div>
          {currentStep === "walletOverview" && (
            <div>
              <div className="row w-100">
                <div className="col-12">
                  <div className="flex-column text-center">
                    <Heading className="pb-3">Your Wallet</Heading>
                    <Heading className="pb-2" size="18px">
                      Public Key: {publickey}
                    </Heading>
                    <Paragraph size="18px" bold>
                      Manage your solana tokens and NFT's below
                    </Paragraph>
                    <button onClick={() => getTokenBalance()}>getWallet</button>
                  </div>
                </div>
              </div>

              <div className="row w-100 mt-4">
                <div className="col-12 d-flex flex-column">
                  <Divider />
                  <Heading size="24px" className="mb-0 pt-4">
                    Solana Tokens
                  </Heading>
                </div>
                <StyledTable className="w-100 mt-4">
                  <thead>
                    <tr>
                      <th>Token</th>
                      <th>Ticker</th>
                      <th>Amount</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FakeTableData.filter((fd) => fd).map((data, d) => (
                      <tr key={d}>
                        <td>
                          <span>{data.token}</span>
                        </td>
                        <td>{data.ticker}</td>
                        <td>{data.amount}</td>
                        <td>{data.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageBody>
  );
}

export default MyWallet;
